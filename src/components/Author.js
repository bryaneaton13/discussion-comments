import React, { Component } from 'react';

export default class Author extends Component {
  render() {
    // let { author, id, isYou } = this.props;
    let { author, isYou } = this.props;

    return (
      <span className="author">
        {author}
        {isYou ? <span className="light color-light-grey"> (You)</span> : ''}
      </span>
    );
  }
}
