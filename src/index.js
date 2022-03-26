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
  constructor(props){
    super(props);

    this.addUser = (newUser,e) => {
      console.log('Add User Click', newUser);
      const users = Object.assign([], this.state.users);
      users.unshift(newUser);
      this.setState({ users: users });
      console.log('Users', this.state.users);
    }

    this.updateUser = (index, e) => {
      const users = Object.assign([], this.state.users);
      users.splice(index, 1);
      this.setState({ users: users })
    }

    this.deleteUser = (index, e) => {
        console.log('Delete User Click');
        const users = Object.assign([], this.state.users);
        users.splice(index, 1);
        this.setState({ users: users });
    }

    this.state = {
      users: dbJSON,
      addUser: this.addUser,
      updateUser: this.updateUser,
      deleteUser: this.deleteUser
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