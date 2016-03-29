import React, { Component, Children } from 'react';
import Author from './Author';
import DateTime from './DateTime';

export default class Comment extends Component {
  render() {
    let { author, author_id, comment, children, datetime } = this.props;
    let childrenDiv = (Children.count(children) > 0) ? (
      <div className="child-comment">
        {children}
      </div>
    ) : null;
    return (
      <div className="comment">
        <Author author={author} id={author_id} />
        <DateTime value={datetime} />
        {comment}
        {childrenDiv}
      </div>
    );
  }
}
