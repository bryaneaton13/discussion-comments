import React, { Component, Children } from 'react';
import AuthorDate from './AuthorDate';

export default class Comment extends Component {
  render() {
    let { author, author_id, comment, children, datetime } = this.props;
    let childrenDiv = (Children.count(children) > 0) ? (
      <div className="child-comment">
        {children}
      </div>
    ) : null;
    return (
      <div className="comment-group">
        <div className="comment">
          <AuthorDate author={author} id={author_id} date={datetime} />
          {comment}
        </div>
        {childrenDiv}
      </div>
    );
  }
}
