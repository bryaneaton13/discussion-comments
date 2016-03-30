import React, { Component, Children } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Author from './Author';
import Comment from './Comment';
import DateTime from './DateTime';
import EditComment from './EditComment';
import { connect } from 'react-redux';

class CommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  hasChildren() {
    return Children.count(this.props.children) > 0;
  }

  renderChildren() {
    if (!this.hasChildren()) return null;
    return (
      <div className="child-comment">
        {this.props.children}
      </div>
    );
  }

  renderActions() {
    let { user, author_id, id, deleted } = this.props;
    if (user !== author_id || deleted) return null;
    if (this.state.editing) {
      return null;
    }
    return (
      <CardActions>
        <FlatButton
          label="Edit"
          primary={true}
          onClick={() => this.setState({editing: true})}
          />
        <FlatButton
          label="Delete"
          secondary={true}
          onClick={() => this.props.onDelete(id)}/>
      </CardActions>
    );
  }

  renderComment() {
    let { comment, deleted } = this.props;
    if (this.state.editing) {
      return <EditComment comment={comment} />;
    }
    if (deleted) {
      return (
        <span className="italic color-light-grey">
          This comment has been deleted.
        </span>
      );
    }
    return <Comment comment={comment} />;
  }

  render() {
    let { author, author_id, deleted, datetime, user } = this.props;
    // Do not render anything if the comment is deleted and there are no children
    if (deleted && !this.hasChildren()) {
      return null;
    }
    return (
      <div className="comment-group">
        <Card>
          <CardHeader
            title={<Author author={author} id={author_id} isYou={author_id === user} />}
            subtitle={<DateTime date={datetime}/>}
          />
          <CardText>
            {this.renderComment()}
          </CardText>
          {this.renderActions()}
        </Card>
        <br />
        {this.renderChildren()}
      </div>
    );
  }
}

export default connect(() => ({}), (dispatch) => {
  return {
    onDelete: (id) => {
      dispatch({
        type: 'DELETE_COMMENT',
        id: id
      });
    }
  };
})(CommentCard);
