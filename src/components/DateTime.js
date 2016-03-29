import React, { Component } from 'react';
import moment from 'moment';

export default class DateTime extends Component {
  render() {
    if (!this.props.date) throw new Error('No date passed in');
    let postDate = moment(this.props.date);
    let date = postDate.format('M/D/YYYY');
    let time = postDate.format('h:mm:ss a');
    let fromNow = postDate.fromNow();
    return (
      <span className="date-time" title={`${date} ${time}`}>
        {fromNow}
      </span>
    );
  }
}
