import React from "react";
import { useState } from "react";
import "../Css/BasicComponents.css";
import "../Css/LoginComponent.css";
import Logo from "../Graphics/Logo/Logo";

const LoginContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [responseError, setResponseError] = useState("");

  const focusHandler = (func) => {
    func(true);
  };

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
      password: password
    };
    
    let responseStatus = 0;
    
    fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLoginData)
        }).then(response => {
          responseStatus = response.status;
          return response.json();
        })
          .then(data => {
            if(responseStatus == 200) {
              console.log(data);
              return data;
            } else setResponseError(data);
          });
    
      
    

    

    

    setEmail("");
    setPassword("");
    setFocusedEmail(false);
    setFocusedPassword(false);
    setResponseError("");

    // console.log(userLoginData);
  };

  const RecoverAccountHandler = () => {
    console.log("Rec");
  };

  const RegisterHandler = () => {
    console.log("Regi");
  };

  return (
    <div className="LoginInputPanel">
      <div className="Logo">
        <Logo />
        <p className="LogoName">ANKIETTE</p>
        <p className="ResponseError">{responseError}</p>
      </div>
      <form className="LoginInputs" id="loginForm" onSubmit={submitHandler}>
        
        <label className="InputLabel" htmlFor="email">
          Email
        </label>
        <input
          className="Input"
          name="email"
          type="email"
          value={email}
          onChange={emailHandler}
          onBlur={() =>focusHandler(setFocusedEmail)}
          onFocus={() => setFocusedEmail(false)}
          focused={focusedEmail.toString()}
          required
        ></input>
        <span className="InputError">{errorMessages.emailError}</span>

        <label className="InputLabel" htmlFor="password">
          Password
        </label>
        <input
          className="Input"
          name="password"
          type="password"
          value={password}
          pattern={inputPatterns.passwordPattern}
          onChange={passwordHandler}
          onBlur={() =>focusHandler(setFocusedPassword)}
          onFocus={() => setFocusedPassword(false)}
          focused={focusedPassword.toString()}
          required
        ></input>
        <span className="InputError">{errorMessages.passwordError}</span>
      </form>
      <div className="LogRegButtons">
        <button className="Button" type="submit" form="loginForm">
          Login
        </button>
        <button className="Button" type="button">
          Register
        </button>
      </div>
      <div className="RecoverButton">
        <button className="Button">Recover account</button>
      </div>
    </div>
  );
};

export default LoginContent;
