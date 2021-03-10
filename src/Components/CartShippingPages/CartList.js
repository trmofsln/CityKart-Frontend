import React from "react";
import "./CartList.css";
import CartProduct from "./CartProduct";

const CartList = ({ cartArray, updateCart }) => {
  return (
    <ul className="cart-list">
      {cartArray.map((object) => (
        <div>
          <CartProduct object={object}  updateCart={updateCart}/>

        </div>
      ))}
    </ul>
  );
};

export default CartList;
