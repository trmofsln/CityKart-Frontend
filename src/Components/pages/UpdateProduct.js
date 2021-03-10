import React, { useState, useEffect, useContext } from "react";
import "./AddNewProduct.css";
import Input from "../../Shared/UIelements/Input";
import Button from "../../Shared/UIelements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Users/components/util/validators";
import useForm from "../../Shared/hooks/formhooks";
import { AuthContext } from "../../Shared/Context/AuthContext";
import { useParams, useHistory } from "react-router-dom";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import LoadingSpinner from "../../Shared/UIelements/LoadingSpinner";
import ErrorModel from "../../Shared/UIelements/ErrorModel";
import ImageUpload from "../../Shared/UIelements/ImageUpload";

const UpdateProduct = () => {
  const auth = useContext(AuthContext);
  const productId = useParams().pid;
  //console.log(productId);
  const [loadedProduct, setLoadedProduct] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedImage, setLoadedImage] = useState("https://www.allin1media.com/wp-content/uploads/2019/01/10x-featured-social-media-image-size.png");

  const [formState, inputHandler, setFormData] = useForm({
    inputs: {
      title: {
        valid: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    isValid: false,
  });

  

  useEffect(() => {

    let identifiedProduct;

    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`
        );
        identifiedProduct = responseData.product;
        setLoadedProduct(responseData.product);
        setLoadedImage(`${process.env.REACT_APP_ASSET_URL}/${identifiedProduct.image} `);
        setFormData({
          inputs: {
            title: {
              value: identifiedProduct.title,
              isValid: true,
            },
            description: {
              value: identifiedProduct.description,
              isValid: true,
            },
            price: {
              value: identifiedProduct.price,
              isValid: true,
            },
            image: {
              value: `${process.env.REACT_APP_ASSET_URL}/${identifiedProduct.image} `,
              isValid: true,
            },
          },
          isValid: true,
        });
      } catch (error) {}
    };

    fetchProduct();
  }, [setFormData, sendRequest]);

  const history = useHistory();
  const updateSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("price", formState.inputs.price.value);
    //formData.append('creatorId',auth.userId);
    formData.append("image", formState.inputs.image.value);


    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
        "PATCH",formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push(`/`);
    } catch (error) {}
  };

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }
  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={clearError} />
      {!loadedProduct && <LoadingSpinner asOverlay />}
      {loadedProduct && (
        <form className="product-form" onSubmit={updateSubmitHandler}>
          <Input
            element="input"
            id="title"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            value={loadedProduct.title}
            isValid={true}
            onInput={inputHandler}
          />
          <Input
            id="description"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid description."
            value={loadedProduct.description}
            isValid={true}
            onInput={inputHandler}
          />
          <Input
            id="price"
            label="Price ₹"
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Please enter a valid Price of this Product"
            value={loadedProduct.price}
            isValid={true}
            onInput={inputHandler}
          />
           {/* imgpath={`${process.env.REACT_APP_ASSET_URL}/${identifiedProduct.image}`} */}
           
          { formState.inputs.image.value && <ImageUpload id="image" onInput={inputHandler} imgPath={formState.inputs.image.value} /> }
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PRODUCT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateProduct;
