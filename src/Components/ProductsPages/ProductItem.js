import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./ProductItem.css";
import Card from "./../../Shared/UIelements/Card";
import Button from "../../Shared/UIelements/Button";
import Modal from "../../Shared/UIelements/Model";
import { AuthContext } from "../../Shared/Context/AuthContext";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ErrorModal from "../../Shared/UIelements/ErrorModel";
import LoadingSpinner from "../../Shared/UIelements/LoadingSpinner";

const ProductItem = ({ product }) => {
  const auth = useContext(AuthContext);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const cancelDeleteHandler = () => {
    setShowDeleteConfirmation(false);
  };
  const history = useHistory();
  var buyNow;

  const confirmDeleteHandler = async () => {
    console.log("Delete");
    setShowDeleteConfirmation(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/products/${product.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.pushState("/");
    } catch (error) {}
  };

  function pushToCartHandler(productId, productPrice, buyNow) {
    try {
      sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/cart/${auth.userId}/addtocart`,
        "POST",
        JSON.stringify({
          cartItems: {
            product: productId,
            quantity: 1,
            price: productPrice,
          },
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (error) {}
    if(buyNow===true){
    alert(`Redirecting You to Billing Page, to buy this Product Now`);
      redirectPage();
    }
    else{
      alert(`Product Added`);
    }
  }

  function redirectPage(){
    let path = `/${auth.userId}/billingPage`; 
    history.push(path);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={showDeleteConfirmation}
        onCancel={cancelDeleteHandler}
        header="Are you sure"
        contentClass="product-item__modal-content"
        footerClass="product-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you really want to delete the product?</p>
      </Modal>
      <li className="product-item">
        <Card className="product-item__content">
          <div className="product-item__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${product.image} `} />
          </div>
          <div className="product-item__info">
            <h2>{product.title}</h2>
            <h3>{product.description}</h3>
            <p>Price: ₹ {product.price}</p>
          </div>
          {auth.isLoggedIn && auth.userId === product.creatorId && (
            <div className="product-item__actions">
              <Button to={`/products/${product.id}`}>Edit</Button>
              <Button
                danger
                onClick={(event) => setShowDeleteConfirmation(true)}
              >
                Delete
              </Button>
            </div>
          )}
          {auth.isLoggedIn && auth.userId != product.creatorId && (
            <div className="product-item__actions">
              <Button onClick={() => pushToCartHandler(product.id, product.price,buyNow=false)}>
                Add To Cart
              </Button>
              <Button onClick={() => pushToCartHandler(product.id, product.price,buyNow=true)} >
                Buy Now
              </Button>
              <Button  to={`/${auth.userId}/checkout`}>
                Go To My Cart
              </Button>
            </div>
          )}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ProductItem;
