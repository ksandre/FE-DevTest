import { createContext } from 'react';

const UsersContext = createContext({
    users: [],
    addUser: () => { },
    updateUser: () => { },
    deleteUser: () => { },
    filteredUsers: [],
    searchValue: '',
});

export default UsersContext;