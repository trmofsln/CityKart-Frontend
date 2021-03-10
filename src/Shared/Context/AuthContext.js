import React from 'react'

export const AuthContext=React.createContext({
    userMode:null,
    userName:null,
    isLoggedIn:false,
    userId:null,
    token: null,
    login:()=>{},
    logout:()=>{}

})
