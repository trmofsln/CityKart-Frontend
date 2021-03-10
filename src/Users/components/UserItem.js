import React from 'react'
import './UserItem.css'
import {Link} from 'react-router-dom'
import Card from './../../Shared/UIelements/Card'
const  UserItem=({user})=> {
    return (
        <li className="user-item">
            <Card className="user-item__content">
             <Link to={`/${user.id}/products`}>
              <div className="user-item__image">
               <div className="avatar"> 
                  <img src={`${process.env.REACT_APP_ASSET_URL}/${user.image}`}/>
               </div>
              </div>
                <div className="user-item__info">
                   <h2>{user.name}</h2>
                   <h3>Products: {user.products.length}</h3>
                </div>
              </Link>
            </Card>
        </li>
    );
}

export default UserItem
