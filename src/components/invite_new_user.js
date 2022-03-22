import React, { Component } from "react";

class InviteNewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    };

    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.roleChange = this.roleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  firstNameChange(event) { this.setState({firstName: event.target.value}); }
  lastNameChange(event) { this.setState({lastName: event.target.value}); }
  emailChange(event) { this.setState({email: event.target.value}); }
  roleChange(event) { this.setState({role: event.target.value}); }

  handleSubmit(event) {
    alert(`
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Role: ${this.state.role}
    `);
    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input type="text" value={this.state.firstName} onChange={this.firstNameChange} />
        </label>
        <br/>
        <label>
          Last Name:
          <input type="text" value={this.state.lastName} onChange={this.lastNameChange} />
        </label>
        <br/>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.emailChange} />
        </label>
        <br/>
        <label>
          Role:
          <select value={this.state.role} onChange={this.roleChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default InviteNewUser;