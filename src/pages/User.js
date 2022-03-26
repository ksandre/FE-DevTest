import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/header";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PermissionsList from '../components/permissions_list';
import CustomSwitch from '../components/custom_switch';
import UsersContext from '../UsersContext';

const User = () => {
  const UsersContextHook = useContext(UsersContext);
  const { id } = useParams();
  const currentUser = UsersContextHook.users.find(element => element.id === id);

  const [userStatus, setDisabled] = useState(currentUser.status === '1' ? true : false);
  const handleDisableUserClick = () => {
    setDisabled(!userStatus);
    if(userStatus) { document.getElementById('userInfo').classList.add("disabled"); }
    else { document.getElementById('userInfo').classList.remove("disabled"); }
  };

  const [openGroup1, setOpen1] = useState(true);
  const [openGroup2, setOpen2] = useState(false);
  const [openGroup3, setOpen3] = useState(false);
  const handleClick1 = () => { setOpen1(!openGroup1); };
  const handleClick2 = () => { setOpen2(!openGroup2); };
  const handleClick3 = () => { setOpen3(!openGroup3); };

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
        <div style={{ width: '300px' }}>
          <div className='activeAfterDisabling'>
            <h1 style={{ paddingBottom: '54px' }}>Details</h1>
            <CustomSwitch onClick={handleDisableUserClick} defaultChecked={currentUser.status === '1' ? true : false} />
            <span>The user is {userStatus === true ? 'Active' : 'Inactive'}</span>
          </div>
          <button className='roundButton hideAfterDisabling' color='blue'>Save Changes</button>
        </div>
        <div style={{ width: '600px' }}>
          <h1 style={{ paddingBottom: '54px' }}>Permissions</h1>
          <div className='superAdmin'><PermissionsList items={currentUser.permissionGroup0} /></div>
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
            <PermissionsList items={currentUser.permissionGroup1} />
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
            <PermissionsList items={currentUser.permissionGroup2} />
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
            <PermissionsList items={currentUser.permissionGroup3} />
          </Collapse>
        </div>
      </div>
    </div>
  )
};

export default User;