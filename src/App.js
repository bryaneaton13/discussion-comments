import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Discussion from './components/Discussion';
import data from './data/discussion.json';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <div>
        <AppBar showMenuIconButton={false} title="Discussion" />
        <Discussion data={data.discussion} />
      </div>
    );
  }
}
