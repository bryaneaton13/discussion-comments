import React, { Component } from 'react';
import moment from 'moment';

export default class DateTime extends Component {
  render() {
    let postDate = moment(this.props.date);
    let date = postDate.format('M/D/YYYY h:mm:ss a');
    let fromNow = postDate.fromNow();
    return (
      <span className="date-time" title={date}>
      {fromNow}
      </span>
    );
  }
}
