import React, { Component, Children } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Author from './Author';
import DateTime from './DateTime';
import { connect } from 'react-redux';

class Comment extends Component {
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
    return (
      <CardActions>
        <FlatButton label="Edit" primary={true}/>
        <FlatButton
          label="Delete"
          secondary={true}
          onClick={() => this.props.onDelete(id)}/>
      </CardActions>
    );
  }

  renderComment() {
    let { comment, deleted } = this.props;
    if (deleted) {
      return (
        <span className="italic color-light-grey">
          This comment has been deleted.
        </span>
      );
    }
    return <span>{comment}</span>;
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
            avatar={`http://lorempixel.com/100/100/cats/${author_id}`}
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
})(Comment);
