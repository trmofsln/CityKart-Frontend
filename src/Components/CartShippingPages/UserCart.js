import React, { useState, useEffect, useContext } from "react";
import ErrorModal from "../../Shared/UIelements/ErrorModel";
import LoadingSpinner from "../../Shared/UIelements/LoadingSpinner";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import CartList from "./CartList";
import Button from "../../Shared/UIelements/Button";
import { AuthContext } from "../../Shared/Context/AuthContext";
import "./UserCart.css";

const UserCart = () => {
  const auth = useContext(AuthContext);

  const userId = useParams().user;
  const [cartArray, setCartArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const loadCart = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/cart/${userId}/loadCart`
        );
        setCartArray(responseData.cartProducts.cartItems);
        setTotalPrice(responseData.totalPrice);
      } catch (error) {}
    };
    loadCart();
  }, [sendRequest]);
  let buyIfItemPresent;
  if (totalPrice !== 0) {
    buyIfItemPresent = (
      <div className="styling">
        <h1 className="textDecoration-h1">
          {" "}
          Total Price: ₹ {totalPrice}/ only{" "}
        </h1>
        <Button to={`/${auth.userId}/billingPage`}> Proceed to Buy </Button>
      </div>
    );
  } else {
    buyIfItemPresent = (
      <h1 className="textDecoration-h1">
        {" "}
        Cart is Empty. Please Add Items to Cart.{" "}
      </h1>
    );
  }

  const updateCart = (itemId) => {
    const newCart = cartArray.filter((item) =>
      item.product.id !== itemId
    );
    setCartArray(newCart);
    console.log('New Cart is Here',newCart);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {cartArray && <CartList cartArray={cartArray} updateCart={updateCart} />}
      {buyIfItemPresent}
    </React.Fragment>
  );
};

export default UserCart;
