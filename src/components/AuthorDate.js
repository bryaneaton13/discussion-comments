import React, { Component } from 'react';
import Author from './Author';
import DateTime from './DateTime';

export default class AuthorDate extends Component {
  render() {
    let { author, id, date } = this.props;
    return (
      <div className="author-date">
        <Author author={author} id={id} />
        <DateTime date={date} />
      </div>
    );
  }
}
