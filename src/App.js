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
    this.state = {
      loggedInUser: this.allUsers[1] ? this.allUsers[1].id : 1
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
                <MenuItem key={u.id} value={u.id} primaryText={u.author} />
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
