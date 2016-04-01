import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/lib/app-bar';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Discussion from './components/Discussion';
import Undo from './components/Undo';
import { getAuthors } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.allUsers = getAuthors(props.data);
    let selectedId = 1;
    if (this.allUsers.length > 0) {
      let max = 0;
      this.allUsers.forEach((user) => {
        if (user.count > max) {
          max = user.count;
          selectedId = user.id;
        }
      });
    }

    this.state = {
      loggedInUser: selectedId
    };
  }

  render() {
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          title="Discussion"
          iconElementRight={
            <DropDownMenu
              labelStyle={{color: 'white'}}
              value={this.state.loggedInUser}
              onChange={(evt, index, value) => this.setState({loggedInUser: value})}>
              {this.allUsers.map((u) => (
                <MenuItem
                  key={u.id}
                  value={u.id}
                  primaryText={`${u.author} (${u.count})`} />
              ))}
            </DropDownMenu>
          }/>

        <Discussion
          data={this.props.data}
          user={this.state.loggedInUser} />
        <Undo />
      </div>
    );
  }
}

export default connect((state) => ({data: state}))(App);
