import React, { useState, useContext } from 'react';
import CustomSwitch from './custom_switch';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import UsersContext from '../UsersContext';

const PermissionsList = (props) => {
  const UsersContextHook = useContext(UsersContext);

  const [openGroup1, setOpen1] = useState(true);
  const [openGroup2, setOpen2] = useState(false);
  const [openGroup3, setOpen3] = useState(false);

  const handleCollapse = (id) => {
    //console.log(id);
    if (id === 'Group1') setOpen1(!openGroup1);
    if (id === 'Group2') setOpen2(!openGroup2);
    if (id === 'Group3') setOpen3(!openGroup3);
  };

  const isOpen = (id) => {
    if (id === 'Group1') return openGroup1;
    if (id === 'Group2') return openGroup2;
    if (id === 'Group3') return openGroup3;
  }

  let items = props.permissionsObjects.map((group, groupIndex) => {
    return (
      <div key={group.name}>
        {group.permissionsList !== undefined && group.permissionsList.length > 0 ?
          <div>
            <div className='permission'>
              <div className='permissionCollapse' onClick={() => handleCollapse(group.id)}>
                <div>{isOpen(group.id) ? <ExpandLess /> : <ExpandMore />}</div>
                <div>{group.name}</div>
              </div>
              <div>
                <CustomSwitch onClick={
                  () => UsersContextHook.updateUser(props.userId, {
                    "permissions": [
                      ...props.permissionsObjects.slice(0, groupIndex),
                      Object.assign({}, props.permissionsObjects[groupIndex], { "value": group.value === 'true' ? 'false' : 'true' }),
                      ...props.permissionsObjects.slice(groupIndex + 1)
                    ]
                  })
                }
                  checked={group.value === 'true' ? true : false} />
              </div>
            </div>
            <Collapse in={isOpen(group.id)} timeout="auto" unmountOnExit>
              <ul className='permissionUl'>
                <br />
                {
                  group.permissionsList.map((list, listIndex) => {
                    console.log(props.permissionsObjects[groupIndex], `Group Index ${groupIndex}`);
                    console.log(props.permissionsObjects[groupIndex].permissionsList[listIndex], `Group Index: ${groupIndex} List Index: ${listIndex}`);
                    return (
                      <li key={list.name}>
                        <div className='permission' color={list.value === 'true' ? 'blue' : 'red'}>
                          <div>{list.name}</div>
                          <CustomSwitch onClick={
                            () => UsersContextHook.updateUser(props.userId, {
                              "permissions": [
                                ...props.permissionsObjects.slice(0, groupIndex),
                                Object.assign({}, props.permissionsObjects[groupIndex], {
                                  "permissionsList": [
                                    ...props.permissionsObjects[groupIndex].permissionsList.slice(0, listIndex),
                                    Object.assign({}, props.permissionsObjects[groupIndex].permissionsList[listIndex], { "value": list.value === 'true' ? 'false' : 'true' }),
                                    ...props.permissionsObjects[groupIndex].permissionsList.slice(listIndex + 1)
                                  ]
                                }),
                                ...props.permissionsObjects.slice(groupIndex + 1)
                              ]
                            })
                          }
                            checked={list.value === 'true' ? true : false} />
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </Collapse>
            <br /><Divider /><br />
          </div>
          :
          <div className='superAdmin'>
            <ul className='permissionUl'>
              <li key={group.name}>
                <div className='permission' color={group.value === 'true' ? 'blue' : 'red'}>
                  <div>{group.name}</div>
                  <CustomSwitch onClick={
                    () => UsersContextHook.updateUser(props.userId, {
                      "permissions": [
                        ...props.permissionsObjects.slice(0, groupIndex),
                        Object.assign({}, props.permissionsObjects[groupIndex], { "value": group.value === 'true' ? 'false' : 'true' }),
                        ...props.permissionsObjects.slice(groupIndex + 1)
                      ]
                    })
                  }
                    checked={group.value === 'true' ? true : false} />
                </div>
              </li>
            </ul>
            <br /><Divider /><br />
          </div>
        }
      </div>
    );
  }
  );

  return <div>{items}</div>
}

export default PermissionsList;