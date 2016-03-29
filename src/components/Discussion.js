import React, { Component } from 'react';
import Author from './Author';
import Comment from './Comment';
import DateTime from './DateTime';

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

    return (
      <div>
        <h1>{title}</h1>
        <div>
          <h4>{discussion}</h4>
          <Author author={author} id={author_id} />
          <DateTime value={datetime} />
        </div>
        <div>
          {this.renderComments(comments)}
        </div>
      </div>
    );
  }
}
