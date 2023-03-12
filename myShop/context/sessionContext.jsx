import React from 'react';

export const session = {
    userId: '',
    PanierId: '',
    token: '', 
    userName: '',
    userSurname: '',
    userAdmin: '',
    userAddress: '' ,
    Email: ''
}
  
export const SessionContext = React.createContext(session);