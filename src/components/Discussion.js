import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Comment from './Comment';
import moment from 'moment';

export default class Discussion extends Component {
  renderComments(comments, key) {
    return comments.map((c, i) => {
      if (c.deleted) return null;
      if (c.comments && c.comments.length) {
        return (
          <Comment {...c} key={`${key}_${i}`}>
            {this.renderComments(c.comments, i)}
          </Comment>
        );
      }
      return <Comment {...c} key={`${key}_${i}`} />;
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
    let fromNow = moment(datetime).fromNow();

    return (
      <div className="discussion">
        <Card style={{
          margin: 10
        }}>
          <CardHeader
            title={title}
            subtitle={`${author} posted this discussion ${fromNow}`}
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
