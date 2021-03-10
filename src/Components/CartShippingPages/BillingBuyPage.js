import React, { useContext } from "react";
import './BillingBuyPage.css';
import Input from "./../../Shared/UIelements/Input";
import Button from "./../../Shared/UIelements/Button";
import {
    BrowserRouter as Router,
    Redirect,
  } from "react-router-dom";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Users/components/util/validators";
import useForm from "../../Shared/hooks/formhooks";
import { AuthContext } from "../../Shared/Context/AuthContext";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import ErrorModal from "../../Shared/UIelements/ErrorModel";
import LoadingSpinner from "../../Shared/UIelements/LoadingSpinner";

const initialState = {
  inputs: {
    buyerName: { value: "", isValid: false },
    address: { value: "", isValid: false },
    city: { value: "", isValid: false },
    pincode: { value: null, isValid: false },
    state: { value: "", isValid: false },
    mobileNumber: { value: "", isValid: false },
    suggestion: { value: "", isValid: false}
  },
  isValid: false,
};

const BillingBuyPage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(initialState);

  const history = useHistory();
  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("buyerName", formState.inputs.buyerName.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("city", formState.inputs.city.value);
    formData.append("state", formState.inputs.state.value);
    formData.append("mobileNumber", formState.inputs.mobileNumber.value);
    formData.append("suggestion", formState.inputs.suggestion.value);
    //console.log(formState.inputs);
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/billingDetail/${auth.userId}`, "PATCH", formData, {
        Authorization: "Bearer " + auth.token,
      });
      history.push(`/${auth.userId}/billingDetail`);
    } catch (err) {
      console.log(err);
    }
    alert('Thankyou so much for Shopping with Us. Your Product Will be delivered within 7 Business Days.');
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/cart/clearCartAfterShopping/${auth.userId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.pushState("/");
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="styling">
      <h2 className="textColor-h1"> Available Payment Method is: Pay On Delivery (You can do Payment By Online Payment at the time of Delivery). <br/> We will soon add other options also. Please Cooperate with us...<br/></h2>
      <h2 className="textColor-h2"> Thanks for using our Services. We Will Deliver Your Product Within 7 Business Days. If any problem occurs, Please Contact on our Customer-Care Number.</h2>
      <h3 className="textColor-h3"> <br/><br/> Please Add your informations for Ease of Delivering the Products. (*: mandatory information ,must have to fill before proceeding further) <br/> <br/> </h3>
      <form className="billing-form" onSubmit={submitHandler}>
        <Input
          element
          id="buyerName"
          errorText="Please enter a valid Name (of Person which will receive the delivery of Products)"
          validators={[VALIDATOR_REQUIRE()]}
          label="Name of Person to Deliver the Products*"
          onInput={inputHandler}
        />

        <Input
          id="address"
          errorText="Please write a valid Address (where Products will be delivered)"
          label="Receiving Point* (Address where person will receive the products)"
          validators={[VALIDATOR_MINLENGTH(10)]}
          onInput={inputHandler}
        />

        <Input
          element
          id="city"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter valid Name of City"
          label="City*"
          onInput={inputHandler}
        />

        <Input
          element
          id="pincode"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter valid PinCode/Zipcode"
          label="PinCode/ZipCode*"
          onInput={inputHandler}
        />

        <Input
          element
          id="state"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter valid Name of State"
          label="State*"
          onInput={inputHandler}
        />

        <Input
          element
          id="mobileNumber"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please Enter valid Mobile/Telephone Number"
          label="Contact Number* (Mobile/Telephone Number)"
          onInput={inputHandler}
        />

        <Input
          id="suggestion"
          validators={[VALIDATOR_MINLENGTH(0)]}
          errorText="Please Enter valid Suggestion"
          label="Suggestion (Optional- Please suggest us about your delivery choice(if any),e.g. Time of delivery or any thing else) "
          onInput={inputHandler}
          isValid={true}
        />
        
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
      <Router>
       <Redirect to="/" />
      </Router>
      </div>
    </React.Fragment>
  );
};

export default BillingBuyPage;
