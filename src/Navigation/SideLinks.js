import React, { useContext } from "react";
import "./SideLink.css";
import CityKart_logo from "../Components/resources/CityKart_img.png";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { AuthContext } from "../Shared/Context/AuthContext";


function SideLinks() {
  const auth = useContext(AuthContext);
  return (
    <nav className="SideLinks">
      <Link to="/">
        {/* logo on the left -> img */}
        <img className="header__logo" src={CityKart_logo} alt="CityKart" />
      </Link>

      {/* Search box 
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div> */}
       
      {/* 1st Link */}
      <div className="link_seperator">
        {!auth.isLoggedIn && (
          <Link to="/auth" className="header__link header__itemInParts">
            <div className="header__option">
              <span className="header__lineOne">Hello User:</span>
              <span className="header__lineTwo">Sign In/Sign Up</span>
            </div>
          </Link>
        )}
        {auth.isLoggedIn && (auth.userMode==="seller")  && (
          <Link to="/auth" className="header__link header__itemInParts">
            <div className="header__option">
            <span className="header__lineOne">Hello {auth.userName} </span>
            <span className="header__lineTwo">Start Shopping</span>
            </div>
          </Link>
        )}
        
        {/* 3rd link */}
        {auth.isLoggedIn && (auth.userMode==="seller")  && (
          <Link
            to={`/${auth.userId}/addProduct`}
            className="header__link header__itemInParts"
          >
            <div className="header__option">
              <span className="header__lineOne">Add Your</span>
              <span className="header__lineTwo">Products</span>
            </div>
          </Link>
        )}
        {/* 4th link */}
        {auth.isLoggedIn && (auth.userMode==="seller")  && (
          <Link
            to={`/${auth.userId}/updateProduct`}
            className="header__link header__itemInParts"
          >
            <div className="header__option">
              <span className="header__lineOne">Update Your</span>
              <span className="header__lineTwo">Products</span>
            </div>
          </Link>
        )}
        {/* 5th link */}
        {auth.isLoggedIn && (
          <Link
            to={`/${auth.userId}/checkout`}
            className="header__link header__itemInParts">
            <div className="header__option">
              <span className="header__lineOne">My Cart:</span>
              <span className="header__lineTwo">CheckOut</span>
            </div>
          </Link>
        )}
        {/* 6th link */}
        {auth.isLoggedIn && (
          <Link to={`/${auth.userId}/logout`} className="header__link header__itemInParts">
            <div className="header__option">
              <span className="header__lineOne">Want to:</span>
              <span className="header__lineTwo">Logout</span>
            </div>
          </Link>
        )}
        {/* 7th link */}
        <Link to="/contactUs" className="header__link header__itemInParts">
          <div className="header__option">
            <span className="header__lineOne">About Us:</span>
            <span className="header__lineTwo">Contact</span>
          </div>
        </Link>
        </div>
      {/* Basket icon with number */}
    </nav>
  );
}
export default SideLinks;
