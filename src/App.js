import React, {Component} from 'react';
import _ from 'lodash';
import {Toast, Root} from 'native-base';
import API from './API.js';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import InspectorPage from './InspectorPage';
import UserPage from './UserPage';
import { ROLE_ADMIN, ROLE_INSPECTOR, ROLE_CLIENT_USER } from './utils/roles';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeUser: undefined,
      // FIXME: Save them in the localstorage?
      users: [
        {
          username: 'Admin',
          password: '123',
          role: ROLE_ADMIN
        },
        {
          username: 'Inspector',
          password: '123',
          role: ROLE_INSPECTOR
        },
        {
          role: ROLE_CLIENT_USER,
          serviceAvailable: false,
          ID: '0013A200405C128C'
        },
        {
          role: ROLE_CLIENT_USER,
          serviceAvailable: false,
          ID: '0013A200406B8D04'
        },
        {
          role: ROLE_CLIENT_USER,
          serviceAvailable: false,
          ID: '0013A200406B8D0B'
        },
        {
          role: ROLE_CLIENT_USER,
          serviceAvailable: false,
          ID: '0013A200405C09EF'
        },
        {
          role: ROLE_CLIENT_USER,
          serviceAvailable: false,
          ID: '0013A200405C09EC'
        },
        {
          role: ROLE_CLIENT_USER,
          serviceAvailable: false,
          ID: '0013A200405C111B'
        }
      ]
    }
  }

  getMeters = () => {
    return _.filter(this.state.users, function(u) { return u.ID; });
  }

  getClientUsers = () => {
    return _.filter(this.state.users, function(u) { return u.ID && u.username; });
  }

  onLogin = (data) => {
    const userIndex = _.findIndex(this.state.users, function(u) { return (u.username && u.username === data.username); });
    const user = this.state.users[userIndex];
    const password = data.password;
    if (user && password === user.password) {
      this.setState({activeUser: user});
    } else {
      Toast.show({
        text: "Invalid user or password",
        duration: 3000,
        type: "danger"
      });
    }
  }

  onEditMeter = (newMeter) => {
    const indexToUpdate = _.findIndex(this.state.users, function(users) { return users.ID === newMeter.ID; });
    const updatedUsers = this.state.users;
    updatedUsers[indexToUpdate] = newMeter;
    this.setState({users: updatedUsers});
  }

  // FIXME (optional): For some reason onEditMeter remove the item if it used for update user service
  updateUserService = (newUser) => {
    const indexToUpdate = _.findIndex(this.state.users, function(users) { return users.ID === newUser.ID; });
    const updatedUsers = this.state.users;
    updatedUsers[indexToUpdate].serviceAvailable = newUser.serviceAvailable;
    this.setState({users: updatedUsers});
  }

  /* We follow an optimistic way of updated, if backend fails we just rollback the change */
  onEditUser = (newUser) => {
    this.updateUserService(newUser)
    API.meterSwitches({
      ID: newUser.ID,
      value: newUser.serviceAvailable
    })
    .then(() => {
      Toast.show({
        text: "User info updated",
        duration: 3000,
        type: "success"
      });
    })
    .catch(() => {
      const userUpdatedRollback = Object.assign({}, newUser, {serviceAvailable: !newUser.serviceAvailable})
      this.updateUserService(userUpdatedRollback);
      Toast.show({
        text: "Error: Can not update user information",
        duration: 3000,
        type: "danger"
      });
    });
  }

  onLogout = () => {
    this.setState({activeUser: undefined})
  }

  render() {
    return (
      <Root>
        {!this.state.activeUser && <LoginPage onLogin={this.onLogin} />}
        {this.state.activeUser && this.state.activeUser.role === ROLE_ADMIN &&
          <AdminPage meters={this.getMeters()} onEditMeter={this.onEditMeter} onLogout={this.onLogout} />}
        {this.state.activeUser && this.state.activeUser.role === ROLE_INSPECTOR &&
          <InspectorPage users={this.getClientUsers()} onEditUser={this.onEditUser} onLogout={this.onLogout} />}
        {this.state.activeUser && this.state.activeUser.role === ROLE_CLIENT_USER &&
          <UserPage user={this.state.activeUser} onLogout={this.onLogout} />}
      </Root>
    )
  }
}
