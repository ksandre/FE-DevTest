import { createContext } from 'react';

const UsersContext = createContext({
    users: [],
    addUser: () => { },
    updateUser: () => { },
    deleteUser: () => { }
});

export default UsersContext;