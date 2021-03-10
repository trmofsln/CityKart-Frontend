import React from 'react';
import UserItem from './UserItem';
import './UsersList.css';
import HeaderLinks from '../../Navigation/HeaderLinks';

const UsersList=({users})=> {
  
    return (
        <div>
         <ul className="users-list">
         {users.length&&
           users.map((user)=>{
               return ( 
                   <div>
                   <UserItem user={user}/>
                   <HeaderLinks user={user}/>
                   </div>
               );
           })}  
         </ul> 
        </div>
    )
}


export default UsersList;