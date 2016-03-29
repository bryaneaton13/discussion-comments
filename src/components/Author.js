import React, { Component } from 'react';

export default class Author extends Component {
  render() {
    let { author, id } = this.props;
    return (
      <div className="author">
        <a className="author-link" href={`#${id}`}>
          {/*author.substr(0, 1).toUpperCase()*/}
          {author}
        </a>
      </div>
    );
  }
}