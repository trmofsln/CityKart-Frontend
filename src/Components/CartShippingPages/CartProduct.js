import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./CartProduct.css";
import Card from "./../../Shared/UIelements/Card";
import Button from "../../Shared/UIelements/Button";
import Modal from "../../Shared/UIelements/Model";
import { AuthContext } from "../../Shared/Context/AuthContext";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ErrorModal from "../../Shared/UIelements/ErrorModel";
import LoadingSpinner from "../../Shared/UIelements/LoadingSpinner";

const CartProduct = ({ object, updateCart }) => {
  const auth = useContext(AuthContext);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const cancelDeleteHandler = () => {
    setShowDeleteConfirmation(false);
  };
  const history = useHistory();

  const confirmDeleteHandler = async () => {
    //console.log("Product Removed From Cart");
    setShowDeleteConfirmation(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/cart/removeProduct/${auth.userId}/${object.product.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      updateCart(object.product.id);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <Modal
        show={showDeleteConfirmation}
        onCancel={cancelDeleteHandler}
        header="Are you sure"
        contentClass="cart-product__modal-content"
        footerClass="cart-product__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Remove from Cart
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you really want to remove product from Cart?</p>
      </Modal>
      <li className="cart-product">
        <Card className="cart-product__content">
          <div className="cart-product__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${object.product.image} `} />
          </div>
          <div className="cart-product__info">
            <h2>⚜️ {object.product.title} ⚜️</h2>
            <h3>‣ {object.product.description}</h3>
            <h3>🔴Quantity:{object.quantity}</h3>
            <h3>
              ⦿Price:₹ {object.product.price} ⦿Total:₹ {object.price}
            </h3>
          </div>
          {auth.isLoggedIn && (
            <div className="cart-product__actions">
              <Button
                danger
                onClick={(event) => setShowDeleteConfirmation(true)}
              >
                Remove this Product from Cart
              </Button>

            </div>
          )}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default CartProduct;
