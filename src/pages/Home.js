import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/header";
import {
  DataGrid
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import CustomSwitch from '../components/custom_switch'
import { Settings as SettingsIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';
import UsersContext from '../UsersContext';

const StyledDataGrid = styled(DataGrid)({
  border: 0,
  '& .MuiDataGrid-columnSeparator *': {
    display: 'none'
  },
  '& .MuiDataGrid-columnHeader:first-of-type div': {
    display: 'none'
  },
  '& .MuiDataGrid-columnHeader:nth-of-type(2) .MuiDataGrid-menuIcon, .MuiDataGrid-columnHeader:nth-of-type(5) .MuiDataGrid-menuIcon': {
    display: 'none'
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-columnHeaders': {
    border: 0,
  },
  '& .MuiDataGrid-row:first-of-type .MuiDataGrid-cell:first-of-type': {
    border: 0,
  },
  '& .MuiDataGrid-row:first-of-type .MuiDataGrid-cell': {
    borderTop: '2px solid #d8d8d8'
  },
  '& .MuiDataGrid-cell:first-of-type': {
    border: 0,
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid #d8d8d8',
    borderColor: '#d8d8d8 !important'
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  '& .MuiDataGrid-footerContainer': {
    border: 0,
  },
});

const Home = () => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <UsersContext.Consumer>
      {({ users, updateUser, deleteUser, filteredUsers }) => (
        <div>
          <Header title={'Project Access'} icon={'addUser'} />
          <div style={{ padding: '0px 100px' }}>
            <StyledDataGrid
              autoHeight
              rows={filteredUsers.length === 0 ? users : filteredUsers}
              columns={[
                {
                  field: 'avatar',
                  headerName: '',
                  description: 'This column has a value getter and is not sortable.',
                  sortable: false,
                  flex: 0,
                  minWidth: 90,
                  renderCell: (params) => {
                    return <div><img style={{ width: "46px", height: "46px" }} alt="" src={params.row.avatar === undefined || params.row.avatar === "" ? '/user_icon.png' : 'params.row.avatar'} /></div>;
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
                    return (
                    <div className='activeAfterDisabling'>
                      <CustomSwitch onClick={
                      () => {
                        updateUser(params.row.id, { "status": params.row.status === '1' ? '0' : '1' })
                        if (params.row.status === '1') { document.querySelector(`[data-id="${params.row.id}"]`).classList.add("disabled"); }
                        else { document.querySelector(`[data-id="${params.row.id}"]`).classList.remove("disabled"); }
                      }
                    }
                    checked={params.row.status === '1' ? true : false} />
                    </div>
                    );
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
                        <Link className="hideAfterDisabling" to={`/user/${params.row.id}`}><SettingsIcon color='disabled' sx={{ "&:hover": { color: blue[500] } }} /></Link>
                        <DeleteIcon className='activeAfterDisabling' onClick={() => { deleteUser(params.row.id) }} color='disabled' sx={{ "&:hover": { color: red[500] } }} />
                      </div>
                    );
                  }
                },
              ]}
              density={'comfortable'}
              disableDensitySelector={true}
              disableColumnSelector={true}
              disableSelectionOnClick={true}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              getRowClassName={(params) => params.row.status === '0' ? 'disabled' : ''}
            />
          </div>
        </div>
      )}
    </UsersContext.Consumer>
  )
}

export default Home;