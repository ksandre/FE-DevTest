import React from 'react';
import CustomSwitch from './custom_switch';

const PermissionsList = (props) => {
    
    const items = props.permissionsGroup.map((group) => {
        return (
          <li key={group.name}>
            <div className='permission' color={group.value === 'true' ? 'blue' : 'red'}>
                <div>{group.name}</div>
                <CustomSwitch defaultChecked={group.value === 'true' ? true : false} />
            </div>
          </li>
        );
      }
    )

    return <ul className='permissionUl'>{items}</ul>
}

export default PermissionsList;