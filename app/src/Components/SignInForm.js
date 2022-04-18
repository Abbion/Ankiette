import React from "react";
import { useState } from "react";
import UserInput from "./UserInput";
import Button from "./Button";

import "../Css/UserInput.css";
import "../Css/Form.css";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorMessages = {
    emailError: "Wrong email format!",
    passwordError: "Wrong password format!",
    
  };
  const inputPatterns = {
    passwordPattern: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`,
  };
 

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userLoginData = {
      email: email,
      password: password,
    };

    setEmail("");
    setPassword("");

    console.log(userLoginData);
  };

  return (
    <div className="form">
      <div className="logo">
        <img src={require("../Assets/ankiette-logo.png")}></img>
        <h2>Ankiette</h2>
      </div>

      <form onSubmit={submitHandler}>
        <UserInput
          name="email"
          label="Email"
          type="email"
          value={email}
          // placeholder="Enter an email"
          required={true}
          className="input"
          onChange={emailHandler}
          errorMessage={errorMessages.emailError}
        />
        <UserInput
          name="password"
          label="Password"
          type="password"
          value={password}
          // placeholder="Enter a password"
          required={true}
          pattern={inputPatterns.passwordPattern}

          className="input"
          onChange={passwordHandler}
          errorMessage={errorMessages.passwordError}
        />
        <div className="buttons-login-form">
          <button className="C_button" type="button">Register</button>
          <button className="C_button" type="submit">Login</button>
        </div>
      </form>
      {/* <button className="C_button">Recover account</button> */}
      <button
        className="C_button"
        type="button"
      >Recover account</button>
    </div>
  );
};

export default SignInForm;
