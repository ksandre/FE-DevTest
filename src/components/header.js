import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Close as CloseIcon } from '@mui/icons-material';
import InviteNewUser from './invite_new_user';
import UsersContext from '../UsersContext';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  minWidth: 646,
  minHeight: 570,
  bgcolor: 'white',
  border: 'none',
};

const Header = (props) => {
    const UsersContextHook = useContext(UsersContext);
    let location = useLocation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if(location.pathname === '/')
    {
        return (
            <div style={{position: 'relative', paddingBottom: '40px'}}>
                <header>
                    <h1>{props.title}</h1>
                    <div className='search'>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="searchUser">
                                {UsersContextHook.searchValue.length !== 0 && UsersContextHook.filteredUsers.length === 0 ? `Can't find user` : 'Type to filter the table'}
                            </InputLabel>
                            <Input
                            error={UsersContextHook.searchValue.length !== 0 && UsersContextHook.filteredUsers.length === 0 ? true : false}
                            id="searchUser"
                            onChange={UsersContextHook.searchUser}
                            endAdornment={
                                <InputAdornment position="end">
                                <SearchIcon />
                                </InputAdornment>
                            }
                            />
                        </FormControl>
                    </Box>
                    </div>
                </header>
                <button className='headerIcon addUser' type="button" onClick={handleOpen}>+</button>
                <StyledModal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={open}
                    onClose={handleClose}
                    BackdropComponent={Backdrop}
                >
                    <Box sx={style}>
                    <IconButton style={{margin:'20px',float:'right'}} onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', clear: 'right'}}>
                        <InviteNewUser />
                    </div>
                    </Box>
                </StyledModal>
            </div>
        )
    } else {
        return (
            <div style={{position: 'relative', paddingBottom: '40px'}}>
                <header>
                    <h1>{props.title}</h1>
                </header>
                {props.icon === 'userSetup' ? <div className='headerIcon userSetup'></div> : ''}
            </div>
        )
    }
}

export default Header;