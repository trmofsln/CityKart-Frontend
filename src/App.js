import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";

import MainNavigation from "./Navigation/MainNavigation";
import Auth from "./Users/pages/Auth";
import { AuthContext } from "./Shared/Context/AuthContext";
import AddNewProduct from "./Components/pages/AddNewProduct";
import UserProducts from "./Components/pages/UserProducts";
import FetchAllProducts from "./Components/pages/FetchAllProduct";
import UpdateProduct from "./Components/pages/UpdateProduct";
import UserCart from "./Components/CartShippingPages/UserCart";
import BillingBuyPage from "./Components/CartShippingPages/BillingBuyPage";
import AboutUsPage from "./Components/pages/AboutUsPage";

function App() {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [userMode, setUserMode] = useState();
  const [userName, setUserName] = useState();

  const login = useCallback((uid, token,userMode,userName, expirationDate) => {   
    setUserId(uid);
    setUserMode(userMode);
    setUserName(userName);
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        userMode: userMode,
        userName: userName,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.userMode,
        storedData.userName,
        new Date(storedData.expiration)
      );
    }

    if (storedData && new Date(storedData.expiration) <= new Date()) {
      logout();
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <FetchAllProducts/>
        </Route>
        <Route path="/:user/addProduct" exact>
          <AddNewProduct />
        </Route>
        <Route path="/:user/updateProduct" exact>
          <UserProducts />
        </Route>
        <Route path="/products/:pid" exact>
          <UpdateProduct/>
        </Route>
        <Route path="/allProducts" exact>
         <FetchAllProducts/>
        </Route>
        <Route path="/:user/checkout" exact>
          <UserCart/>
        </Route>
        <Route path="/:user/billingPage" exact>
          <BillingBuyPage/>
        </Route>
        <Route path="/contactUs" exact>
          <AboutUsPage/>
        </Route>
        <Route path="/:user/logout">
          <Logout />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/allProducts" exact>
          <FetchAllProducts/>
        </Route>
        <Route path="/contactUs" exact>
          <AboutUsPage/>
        </Route>
        {/* This is the default route */}
        <Route path="/" exact>
          <FetchAllProducts/>
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userMode: userMode,
        userName: userName,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div className="App">
          <MainNavigation />
          <main>{routes}</main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
