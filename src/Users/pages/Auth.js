import React, { useState, useContext } from "react";
import "./Auth.css";
import { AuthContext } from "./../../Shared/Context/AuthContext";
import Card from "./../../Shared/UIelements/Card";
import Button from "./../../Shared/UIelements/Button";
import Input from "./../../Shared/UIelements/Input";
import ErrorModal from '../../Shared/UIelements/ErrorModel'
import LoadingSpinner from "../../Shared/UIelements/LoadingSpinner"
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/util/validators";
import {Redirect} from 'react-router-dom';
import useForm from "./../../Shared/hooks/formhooks";
import ImageUpload from '../../Shared/UIelements/ImageUpload'
import {useHttpClient} from '../../Shared/hooks/http-hook';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm({
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });


  const {isLoading,error,sendRequest,clearError}= useHttpClient();
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        inputs: {
          ...formState.inputs,
          name: undefined,
          image:undefined,
          sellerTrueFalse:undefined
        },
        isValid:
          formState.inputs.email.isValid && formState.inputs.password.isValid,
      });
    } else {
      setFormData({
        inputs: {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image:{value: null, isValid: false},
          sellerTrueFalse: { value: "", isValid: false }
        },
        isValid: false,
      });
    }
    setIsLoginMode(prevState => !prevState);
  };
  const submitHandler = async(event) => {
    event.preventDefault();
    if(isLoginMode){
      try{
        const responseData= await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email:formState.inputs.email.value,
            password:formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        )
       auth.login(responseData.userId,responseData.token,responseData.userMode,responseData.userName);
       //auth.login();
      }catch(err){ }

    }else{
      const formData = new FormData();

      formData.append('name',formState.inputs.name.value);
      formData.append('userdp',formState.inputs.image.value);
      formData.append('email',formState.inputs.email.value);
      formData.append('password',formState.inputs.password.value);
      formData.append('sellerTrueFalse',formState.inputs.sellerTrueFalse.value);
      try{
         const responseData=await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
           'POST',
           formData
           )
        auth.login(responseData.userId,responseData.token);
        //auth.login();
    }catch(err){ }
  
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error}  onClear={clearError}/>
      {isLoading && <LoadingSpinner asOverlay/>}
     {!isLoading && (
      <Card className="authentication">
        <h2>{isLoginMode ? "Login" : "SignUp"}</h2>
        <hr />
       <form onSubmit={submitHandler}>
        {!isLoginMode && (
          <React.Fragment>
          <Input
            id="name"
            type="text"
            element="input"
            label="Name"
            errorText="Enter a valid Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            value={formState.inputs.name.value}
            isValid={formState.inputs.name.isValid}
          />
          <ImageUpload id="image" center onInput={inputHandler}/>
          </React.Fragment>
        )}
        <Input
          type="email"
          label="Email"
          id="email"
          value={formState.inputs.email.value}
          isValid={formState.inputs.email.isValid}
          errorText="Enter a valid Email"
          validators={[VALIDATOR_EMAIL()]}
          element="input"
          onInput={inputHandler}
        />
        <Input
          type="password"
          label="Password"
          errorText="Enter a valid password (MIN_LENGTH:6)"
          id="password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          element="input"
          onInput={inputHandler}
          value={formState.inputs.password.value}
          isValid={formState.inputs.password.isValid}
        />
        {!isLoginMode && (
          <React.Fragment>
          <label> Are You Seller(ShopKeeper)/Customer? Please Check Right Option for Better Result..<br/></label>
        <Input
            id="sellerTrueFalse"
            type="radio"
            name="sellerTrueFalse"
            element="input"
            label="I am Seller. "
            errorText="Enter a valid Response"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            value="seller"
          />
          <Input
            id="sellerTrueFalse"
            type="radio"
            name="sellerTrueFalse"
            element="input"
            label="I am Customer. "
            errorText="Enter a valid Response"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            value="customer"
          />
          </React.Fragment>
        )}
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "SignUp"}
        </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch To {isLoginMode ? "SignUp" : 'Login'}
        </Button>
      </Card>
     )}
   </React.Fragment>
  );
};

export default Auth;
