import React, { useState, useContext } from "react";
import UsersContext from '../UsersContext';
import FaceIcon from '@mui/icons-material/Face';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

const InviteNewUser = (props) => {
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
  const roles = [
    {
      value: 'User',
      label: 'User',
    },
    {
      value: 'Admin',
      label: 'Admin',
    }
  ]
  const [role, setRole] = useState('User');

  const handleRolesChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    let randomId = Math.floor(Math.random() * 100000);
    let invitedUser = {
      id: `${randomId}`,
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      email: email,
      role: role,
      "status": "0",
      "vpn": "false"
    };

    //alert(JSON.stringify(invitedUser));

    UsersContextHook.addUser(invitedUser);
    event.preventDefault();
    props.closeModal();
  }

  return (
    <div>
      <h1 style={{marginLeft: '30px'}}>Invite New User</h1>
      <br /><br />
      <form action="" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <FaceIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField onChange={firstNameChange} id="input-with-sx" label="First Name" variant="standard" required />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 1 }}>
            <TextField onChange={lastNameChange} id="input-with-sx" label="Last Name" variant="standard" required />
          </Box>
        </Box>
        <br />
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AlternateEmailIcon sx={{ mr: 1, my: 0.5 }} />
          <TextField onChange={emailChange} fullWidth id="input-with-sx" label="Email" variant="standard" required />
        </Box>
        <br />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 1 }}>
          <KeyIcon sx={{ mr: 1, my: 0.5 }} />
          <TextField
            fullWidth
            id="user-role"
            select
            value={role}
            onChange={handleRolesChange}
            variant="standard"
            required
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <br />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
          <button style={{ width: '142px', height: '42px' }} type="submit" className='roundButton hideAfterDisabling' color='blue' disabled={firstName.length === 0 || lastName.length === 0 || email.length === 0 ? 'disabled' : ''}>
            Send Invitation
          </button>
          <span style={
            firstName.length === 0 || lastName.length === 0 || email.length === 0 ? { fontStyle: 'italic', color: '#F89797' } : { fontStyle: 'italic', color: '#44D36A' }
          }>
            {firstName.length === 0 || lastName.length === 0 || email.length === 0 ? 'Fill in all the fields' : 'Good to go'}
          </span>
        </Box>
      </form>
    </div>
  );
}

export default InviteNewUser;