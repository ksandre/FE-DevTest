import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/header";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import CustomSwitch from '../components/custom_switch'
import { Settings as SettingsIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';
import UsersContext from '../UsersContext';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
  },
  '& .MuiDataGrid-cell': {
    padding: '10px 0px',
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const Home = () => {
  return (
    <UsersContext.Consumer>
      {({ users, addUser, deleteUser, filteredUsers }) => (
        <div>
          <Header title={'Project Access'} icon={'addUser'} />
          <div style={{ padding: '0px 100px' }}>
            <StyledDataGrid
              autoHeight
              rows={filteredUsers.length === 0 ?  users : filteredUsers}
              columns={[
                {
                  field: 'avatar',
                  headerName: '',
                  description: 'This column has a value getter and is not sortable.',
                  sortable: false,
                  flex: 0,
                  minWidth: 90,
                  renderCell: (params) => {
                    return <div><img style={{ width: "46px", height: "46px" }} alt="" src={params.row.avatar === "" ? '/user_icon.png' : 'params.row.avatar'} /></div>;
                  }
                },
                {
                  field: 'fullName',
                  headerName: 'USER',
                  description: 'This column has a value getter and is not sortable.',
                  sortable: false,
                  flex: 3,
                  renderCell: (params) => {
                    return <div><b>{params.row.firstName} {params.row.lastName}</b><br />{params.row.email}</div>
                  }
                },
                {
                  field: 'role',
                  headerName: 'ROLE',
                  flex: 2,
                  renderCell: (params) => {
                    return (
                      <div style={{ position: 'relative' }}>
                        {params.row.vpn !== undefined ? <div className='roundButton homeUserVpn' color='violet'></div> : ''}
                        <b>{params.row.role}</b>
                      </div>
                    );
                  }
                },
                {
                  field: 'status',
                  headerName: 'STATUS',
                  flex: 2,
                  renderCell: (params) => {
                    return <div><CustomSwitch defaultChecked={params.row.status === '1' ? true : false} /></div>
                  }
                },
                {
                  field: 'actions',
                  headerName: 'ACTIONS',
                  sortable: false,
                  headerAlign: 'right',
                  align: 'right',
                  flex: 1,
                  renderCell: (params) => {
                    return (
                      <div>
                        <Link to={`/user/${params.row.id}`}><SettingsIcon color='disabled' sx={{ "&:hover": { color: blue[500] } }} /></Link>
                        <DeleteIcon onClick={() => { deleteUser(params.row.id) }} color='disabled' sx={{ "&:hover": { color: red[500] } }} />
                      </div>
                    );
                  }
                },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableDensitySelector={true}
              disableColumnSelector={true}
              disableSelectionOnClick={true}
              components={{
                Pagination: CustomPagination,
              }}
            />
          </div>
        </div>
      )}
    </UsersContext.Consumer>
  )
}

export default Home;