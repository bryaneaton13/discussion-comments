import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Comment from './Comment';
import DateTime from './DateTime';

export default class Discussion extends Component {
  renderComments(comments, key = 'comment') {
    return comments.map((c, i) => {
      let commentProps = {
        ...c,
        key: `${key}_${i}`,
        user: this.props.user,
        onDelete: this.props.onDeleteComment
      };
      if (c.comments && c.comments.length) {
        return (
          <Comment {...commentProps}>
            {this.renderComments(c.comments, i)}
          </Comment>
        );
      }
      return <Comment {...commentProps} />;
    });
  }
  render() {
    let {
      title,
      author,
      author_id,
      discussion,
      datetime,
      comments
    } = this.props.data;

    return (
      <div className="discussion">
        <Card style={{
          margin: 10
        }}>
          <CardTitle title={title} />
          <CardHeader
            title={author}
            subtitle={<DateTime date={datetime}/>}
            avatar={`http://lorempixel.com/100/100/cats/${author_id}`}
          />
          <CardText>
            {discussion}
          </CardText>
        </Card>
        <div style={{
          margin: 20
        }}>
          Comments
          {this.renderComments(comments)}
        </div>
      </div>
    );
  }
}
