import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../components/header";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import PermissionsList from '../components/permissions_list';
import CustomSwitch from '../components/custom_switch';
import UsersContext from '../UsersContext';

const User = () => {
  let history = useNavigate();
  const UsersContextHook = useContext(UsersContext);
  const { id } = useParams();
  const currentUser = UsersContextHook.users.find(element => element.id === id);

  const handleDisableUserClick = () => {
    UsersContextHook.updateUser(id,{"status": currentUser.status === '1' ? '0' : '1'});
    if (currentUser.status === '1') { document.getElementById('userInfo').classList.add("disabled"); }
    else { document.getElementById('userInfo').classList.remove("disabled"); }
  };

  // First Name
  const [firstName, setfirstName] = useState(currentUser.firstName);
  const firstNameChange = event => setfirstName(event.target.value);
  // Last Name
  const [lastName, setlastName] = useState(currentUser.lastName);
  const lastNameChange = event => setlastName(event.target.value);

  // Roles Input
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
  const [role, setRole] = useState(currentUser.role);

  const handleRolesChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    UsersContextHook.updateUser(id, {
      firstName: firstName,
      lastName: lastName,
      role: role
    });
    event.preventDefault();
    history("/");
  }

  return (
    <div>
      <Header title={'User Setup'} icon={'userSetup'} />
      <div id="userInfo" className={`userInfo ${currentUser.status === '1' ? '' : 'disabled'}`}>
        <aside style={{ textAlign: 'center' }}>
          <div className='activeAfterDisabling'>
            <div style={{ position: 'relative' }}>
              <img alt="" src={currentUser.avatar === undefined || currentUser.avatar === '' ? '../user_icon.png' : currentUser.avatar} />
              {currentUser.vpn !== undefined ? <div className='roundButton userAvatarVpn' color='violet'></div> : ''}
            </div>
          </div>
          <div style={
            {
              fontSize: '14px',
              textTransform: 'uppercase',
              color: '#B0ACAC',
              padding: '10px 0px 30px'
            }
          }>
            <input style={{ width: '0px', height: '0px' }} id="image-file" type="file" />
            <label htmlFor='image-file' className='hideAfterDisabling'>upload a photo</label>
          </div>
          <h1 style={{ fontSize: '48px' }}>{currentUser.firstName}<br />{currentUser.lastName}</h1>
          <br />
          <div style={{ paddingBottom: '60px' }}>{currentUser.email}</div>
          <button className='roundButton hideAfterDisabling' color='violet'>Resend the invite</button>
        </aside>
        <aside>
          <div className='activeAfterDisabling'>
            <h1 style={{ paddingBottom: '54px' }}>Details</h1>
            <div className='disableUser'>
              <CustomSwitch onClick={handleDisableUserClick} checked={currentUser.status === '1' ? true : false} />
              <span>The user is {currentUser.status === '1' ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          <br /><br />
          <form action="" onSubmit={handleSubmit}>
            <TextField
              error={firstName.length === 0 ? true : false}
              fullWidth
              required
              id="standard-required"
              label="First Name"
              defaultValue={firstName}
              onChange={firstNameChange}
              variant="standard"
            />
            <br /><br />
            <TextField
              error={lastName.length === 0 ? true : false}
              fullWidth
              required
              id="standard-required"
              label="Last Name"
              defaultValue={lastName}
              onChange={lastNameChange}
              variant="standard"
            />
            <br /><br />
            <TextField
              fullWidth
              id="user-role"
              select
              label="Select"
              value={role}
              onChange={handleRolesChange}
              helperText="Please select user role"
              variant="standard"
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <button style={{marginTop: '112px'}} type="submit" className='roundButton hideAfterDisabling' color='blue' disabled={firstName.length === 0 || lastName.length === 0 ? 'disabled' : ''}>Save Changes</button>
          </form>
        </aside>
        {currentUser.permissions !== undefined && currentUser.permissions.length > 0 ?
        <aside>
          <h1 style={{ paddingBottom: '54px' }}>Permissions</h1>
          <PermissionsList userId={id} permissionsObjects={currentUser.permissions} />
        </aside>
        :
        <aside>
          <Alert style={{border: '1px solid #ffac31'}} severity="warning">Moderator has not set permissions for this user yet.</Alert>
        </aside>
        }
      </div>
    </div>
  )
};

export default User;