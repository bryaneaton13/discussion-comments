import React, { Component } from 'react';
import moment from 'moment';

export default class DateTime extends Component {
  render() {
    let postDate = moment(this.props.value);
    let date = postDate.format('M/D/YYYY');
    let time = postDate.format('h:mm:ss a');
    return (
      <div className="date-time">
        {`${date} ${time}`}
      </div>
    );
  }
}
