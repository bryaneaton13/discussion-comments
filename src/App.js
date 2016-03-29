import React, { Component } from 'react';
import Discussion from './components/Discussion';
import data from './data/discussion.json';

export default class App extends Component {
  render() {
    return (
      <Discussion data={data.discussion} />
    );
  }
}
