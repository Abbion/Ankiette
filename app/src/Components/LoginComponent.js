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

    

    setEmail("");
    setPassword("");
    setFocusedEmail(false);
    setFocusedPassword(false);

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
        <span>{errorMessages.emailError}</span>

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
        <span className="ErrorMessage">{errorMessages.passwordError}</span>
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
