import React, { useState, useContext } from "react";
import UsersContext from '../UsersContext';

const InviteNewUser = () => {
  const UsersContextHook = useContext(UsersContext);
  // First Name
  const [firstName, setfirstName] = useState('');
  const firstNameChange = event => setfirstName(event.target.value);
  // Last Name
  const [lastName, setlastName] = useState('');
  const lastNameChange = event => setlastName(event.target.value);
  // Email
  const [email, setEmail] = useState('');
  const emailChange = event => setEmail(event.target.value);
  // Role
  const [role, setRole] = useState('');
  const roleChange = event => setRole(event.target.value);

  const handleSubmit = (event) => {
    let randomId = Math.floor(Math.random() * 100000);
    let invitedUser = {
      id: randomId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role
    };

    alert(JSON.stringify(invitedUser));

    UsersContextHook.addUser(invitedUser);
    event.preventDefault();
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={firstNameChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={lastNameChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" value={email} onChange={emailChange} />
      </label>
      <br />
      <label>
        Role:
        <select value={role} onChange={roleChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </label>
      <br />
      <input type="submit" value="Submit"/>
    </form>
  );
}

export default InviteNewUser;