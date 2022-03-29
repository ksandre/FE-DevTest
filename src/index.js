import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/style.css';
import Home from "./pages/Home";
import User from "./pages/User";
import NoPage from "./pages/NoPage";
import dbJSON from './assets/db.json';
import UsersContext from './UsersContext';

class App extends Component {
  constructor(props) {
    super(props);

    this.addUser = (newUser, e) => {
      console.log('Add User Click', newUser);
      //const users = Object.assign([], this.state.users);
      //users.unshift(newUser);
      this.setState({
        users: [
          newUser,
          ...this.state.users
        ]
      }, () => { console.log(this.state.users); });
    }

    this.updateUser = (id, userAttributes) => {
      let index = this.state.users.findIndex(x => x.id === id);
      if (index === -1) {
        console.log(`Can't find user with id ${id}`);
      }
      else {
        this.setState({
          users: [
            ...this.state.users.slice(0, index),
            Object.assign({}, this.state.users[index], userAttributes),
            ...this.state.users.slice(index + 1)
          ]
        }, () => { console.log(this.state.users); });
      }
    }

    this.deleteUser = (uid) => {
      console.log('Delete User Click', uid);
      const users = Object.assign([], this.state.users);
      const index = users.findIndex(user => user.id === uid);
      users.splice(index, 1);
      this.setState({ users: users });

      let searchUserInput = document.getElementById('searchUser');
      if (searchUserInput.value.length !== 0) {
        const filteredUsers = Object.assign([], this.state.filteredUsers);
        const index = filteredUsers.findIndex(user => user.id === uid);
        filteredUsers.splice(index, 1);
        this.setState({ filteredUsers: filteredUsers });
      }
    }

    this.searchUser = (e) => {
      console.log(e.target.value);
      let keyword = e.target.value;

      let filtered = this.state.users.filter((user) => {
        return user.fullName.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
      })

      this.setState({
        filteredUsers: filtered,
        searchValue: e.target.value
      });

      console.log(this.state.filteredUsers);
    }

    this.state = {
      users: dbJSON,
      addUser: this.addUser,
      updateUser: this.updateUser,
      deleteUser: this.deleteUser,
      searchUser: this.searchUser,
      filteredUsers: [],
      searchValue: ''
    };
  }

  render() {
    return (
      <UsersContext.Provider value={this.state}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="user/:id" element={<User />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </UsersContext.Provider>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);