import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import Avatar from 'material-ui/lib/avatar';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import Author from './Author';
import CommentCard from './CommentCard';
import DateTime from './DateTime';

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'top'
    };
  }

  renderComments(comments) {
    return comments.map((c) => {
      let commentProps = {
        ...c,
        key: c.id,
        user: this.props.user,
        onDelete: this.props.onDeleteComment
      };
      if (c.comments && c.comments.length) {
        return (
          <CommentCard {...commentProps}>
            {this.renderComments(c.comments)}
          </CommentCard>
        );
      }
      return <CommentCard {...commentProps} />;
    });
  }
  render() {
    let { user, sort, onSortOld, onSortNew, data } = this.props;
    let {
      title,
      author,
      author_id,
      discussion,
      datetime,
      comments
    } = data;

    return (
      <div className="discussion">
        <Card>
          <CardTitle title={title} />
          <CardHeader
            title={<Author author={author} id={author_id} isYou={author_id === user} />}
            subtitle={<DateTime date={datetime}/>}
            avatar={<Avatar>{author[0]}</Avatar>}
          />
          <CardText style={{fontSize: 16}}>
            {discussion}
          </CardText>
        </Card>
        <div>
          <div className="comment-header">
            <span className="">
              Comments
            </span>
            <RaisedButton
              label="Oldest"
              onClick={onSortOld}
              secondary={sort === 'old'} />
            <RaisedButton
              label="Newest"
              onClick={onSortNew}
              secondary={sort === 'new'} />
          </div>
          <FlipMove>
            {this.renderComments(comments)}
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({sort: state.sort}), (dispatch) => {
  return {
    onSortOld: () => dispatch({type: 'SORT_OLD'}),
    onSortNew: () => dispatch({type: 'SORT_NEW'})
  };
})(Discussion);
