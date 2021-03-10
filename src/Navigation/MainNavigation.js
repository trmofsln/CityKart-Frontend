import React, {useState} from 'react';
//import {Link} from 'react-router-dom';
import HeaderLinks from './HeaderLinks';
import './MainNavigation.css';
import SideDrawer from './SideDrawer';
import Backdrop from'./BackDrop';
import SideLinks from './SideLinks';

const  MainNavigation=()=>{
    const [drawerIsOpen,setDrawerIsOpen]=useState(false);
    const openDrawer=()=>{
        setDrawerIsOpen(true);
    }
    const closeDrawer=()=>{
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
        {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
        
         <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
         <nav className="main-navigation__drawer-nav">
         <SideLinks/>
         </nav>
         </SideDrawer>

         <header className="main-header">
         <button className="main-navigation__menu-btn" onClick={openDrawer}>
         <span/>
         <span/>
         <span/>
         </button>
            
        
        
         <nav className="main-navigation__header-nav">
         <HeaderLinks/>
         </nav>
        </header>
        </React.Fragment>
    )
}

export default MainNavigation
