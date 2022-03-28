import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/header";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import PermissionsList from '../components/permissions_list';
import CustomSwitch from '../components/custom_switch';
import UsersContext from '../UsersContext';

const User = () => {
  const UsersContextHook = useContext(UsersContext);
  const { id } = useParams();
  const currentUser = UsersContextHook.users.find(element => element.id === id);
  console.log(currentUser.permissions[0].name);
  console.log(currentUser.permissions[1].permissionsList);
  console.log(currentUser.permissions[2].permissionsList);
  console.log(currentUser.permissions[3].permissionsList);

  const [userStatus, setDisabled] = useState(currentUser.status === '1' ? true : false);
  const handleDisableUserClick = () => {
    setDisabled(!userStatus);
    if (userStatus) { document.getElementById('userInfo').classList.add("disabled"); }
    else { document.getElementById('userInfo').classList.remove("disabled"); }
  };

  const [openGroup1, setOpen1] = useState(true);
  const [openGroup2, setOpen2] = useState(false);
  const [openGroup3, setOpen3] = useState(false);
  const handleClick1 = () => { setOpen1(!openGroup1); };
  const handleClick2 = () => { setOpen2(!openGroup2); };
  const handleClick3 = () => { setOpen3(!openGroup3); };

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
    event.preventDefault();
  }

  return (
    <div>
      <Header title={'User Setup'} icon={'userSetup'} />
      <div id="userInfo" className={`userInfo ${currentUser.status === '1' ? '' : 'disabled'}`}>
        <div style={{ textAlign: 'center' }}>
          <div className='activeAfterDisabling'>
            <div style={{ position: 'relative' }}>
              <img alt="" src={currentUser.avatar === '' ? '../user_icon.png' : currentUser.avatar} />
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
        </div>
        <div style={{ width: '300px', position:'relative' }}>
          <div className='activeAfterDisabling'>
            <h1 style={{ paddingBottom: '54px' }}>Details</h1>
            <div style={{marginLeft: '-60px'}}>
            <CustomSwitch onClick={handleDisableUserClick} defaultChecked={currentUser.status === '1' ? true : false} />
            <span>The user is {userStatus === true ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          <br/><br/>
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
            <br/><br/>
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
            <br/><br/>
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
            <div style={{position: 'absolute', left: '0px', bottom: '0px'}}>
              <button type="submit" className='roundButton hideAfterDisabling' color='blue' disabled={firstName.length === 0 || lastName.length === 0 ? 'disabled' : ''}>Save Changes</button>
            </div>
          </form>
        </div>
        <div style={{ width: '600px' }}>
          <h1 style={{ paddingBottom: '54px' }}>Permissions</h1>
          {/* <div className='superAdmin'><PermissionsList permissionsGroup={currentUser.permissions[0]} /></div> */}
          <div className='permission'>
            <div className='permissionCollapse' onClick={handleClick1}>
              <div>{openGroup1 ? <ExpandLess /> : <ExpandMore />}</div>
              <div>Permission Group 1</div>
            </div>
            <div>
              <CustomSwitch />
            </div>
          </div>
          <Collapse in={openGroup1} timeout="auto" unmountOnExit>
            <PermissionsList permissionsGroup={currentUser.permissions[1].permissionsList} />
          </Collapse>
          <div className='permission'>
            <div className='permissionCollapse' onClick={handleClick2}>
              <div>{openGroup2 ? <ExpandLess /> : <ExpandMore />}</div>
              <div>Permission Group 2</div>
            </div>
            <div>
              <CustomSwitch />
            </div>
          </div>
          <Collapse in={openGroup2} timeout="auto" unmountOnExit>
            <PermissionsList permissionsGroup={currentUser.permissions[1].permissionsList} />
          </Collapse>
          <div className='permission'>
            <div className='permissionCollapse' onClick={handleClick3}>
              <div>{openGroup3 ? <ExpandLess /> : <ExpandMore />}</div>
              <div>Permission Group 3</div>
            </div>
            <div>
              <CustomSwitch />
            </div>
          </div>
          <Collapse in={openGroup3} timeout="auto" unmountOnExit>
            <PermissionsList permissionsGroup={currentUser.permissions[1].permissionsList} />
          </Collapse>
        </div>
      </div>
    </div>
  )
};

export default User;