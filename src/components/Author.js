import React, { Component } from 'react';

export default class Author extends Component {
  render() {
    // let { author, id, isYou } = this.props;
    let { author, isYou } = this.props;

      // <a className="author-link" href={`#${id}`}>
      //   {author}
      //   {isYou ? ' (You)' : ''}
      // </a>
    return (
      <span className="author">
        {author}
        {isYou ? ' (You)' : ''}
      </span>
    );
  }
}
