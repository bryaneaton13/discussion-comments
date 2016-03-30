import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Discussion from './components/Discussion';
import Undo from './components/Undo';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: 2
    };
  }

  render() {
    return (
      <div>
        <AppBar showMenuIconButton={false} title="Discussion" />
        <Discussion
          data={this.props.data}
          user={this.state.loggedInUser} />
        <Undo />
      </div>
    );
  }
}

export default connect((state) => ({data: state}))(App);
