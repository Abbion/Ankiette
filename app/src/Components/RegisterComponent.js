import React from 'react';
import { useState } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

import '../Css/BasicComponents.css';
import '../Css/RegisterComponent.css';

import {useNavigate} from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import Logo from '../Graphics/Logo/Logo';

const RegisterComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseError, setResponseError] = useState("");


  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedName, setFocusedName] = useState(false);
  const [focusedSurname, setFocusedSurname] = useState(false);
  const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false);
  const focusHandler = (func) => {
    func(true);
  };

  /*Pewien sposób wstępnej walidacji danych, mona te za pomocą { useFormik } z biblioteki 'formik', mozliwe, ze lepiej */
  const errorMessages = {
    emailError: "Wrong email format!",
    nameError: "Name is required",
    surnameError: "Surname is required",
    passwordError: "Wrong password format!",
    confirmPasswordError: "Passwords don't match!",
    captchaError: "reCAPTCHA is required",
  };

  const inputPatterns = {
    // passwordPattern: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`,
    passwordPattern: `.*`,
    confirmPasswordPattern: password,
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const surnameHandler = (e) => {
    setSurname(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const reCaptchaHandler = (e) => {
    console.log('Captcha value:', e.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const userRegisterData = {
      name: name,
      surname: surname,
      email: email,
      password: password
    };


    let responseStatus = 0;
    
    fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRegisterData)
        }).then(response => {
          responseStatus = response.status;
          return response.json();
        })
          .then(data => {
            if(responseStatus === 200) {
              console.log(data);
              ReactSession.set("isAuthenticated", true);
              navigate('/registerSuccess');
            } else setResponseError(data);
            return data;
          });
    

    setEmail("");
    setName("");
    setSurname("");
    setPassword("");
    setConfirmPassword("");

    setFocusedEmail(false);
    setFocusedPassword(false);
    setFocusedName(false);
    setFocusedSurname(false);
    setFocusedConfirmPassword(false);
    setResponseError("");
  };

  return (
    <div className="RegisterInputPanel">
      <div className="Logo">
        <Logo />
        <p className="LogoName">ANKIETTE</p>
      </div>
      <div className="TabName">
          <h1>Registration</h1>
          <p className="ResponseError">{responseError}</p>
      </div>
      <form
        className="RegisterInputs"
        id="registerForm"
        onSubmit={submitHandler}
      >
        <label className="InputLabel" htmlFor="">
          Email
        </label>
        <input
          className="Input"
          name="email"
          type="email"
          value={email}
          onChange={emailHandler}
          onBlur={() =>focusHandler(setFocusedEmail)}
          onFocus={() =>setFocusedEmail(false)}
          focused={focusedEmail.toString()}
          required
        />
        <span className="InputError">{errorMessages.emailError}</span>
        <label className="InputLabel" htmlFor="">
          Name
        </label>
        <input
          className="Input"
          name="name"
          type="text"
          value={name}
          onChange={nameHandler}
          onBlur={() =>focusHandler(setFocusedName)}
          onFocus={() => setFocusedName(false)}
          focused={focusedName.toString()}
          required
        />
        <span className="InputError">{errorMessages.nameError}</span>
        <label className="InputLabel" htmlFor="">
          Surname
        </label>
        <input
          className="Input"
          name="surname"
          type="text"
          value={surname}
          onChange={surnameHandler}
          onBlur={() => focusHandler(setFocusedSurname)}
          onFocus={() => setFocusedSurname(false)}
          focused={focusedSurname.toString()}
          required
        />
        <span className="InputError">{errorMessages.surnameError}</span>
        <label className="InputLabel" htmlFor="">
          Password
        </label>
        <input
          className="Input"
          name="password"
          type="password"
          value={password}
          pattern={inputPatterns.passwordPattern}
          onChange={passwordHandler}
          onBlur={() => focusHandler(setFocusedPassword)}
          onFocus={() => setFocusedPassword(false)}
          focused={focusedPassword.toString()}
          required
        />
        <span className="InputError">{errorMessages.passwordError}</span>
        <label className="InputLabel" htmlFor="">
          Repeat password
        </label>
        <input
          className="Input"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={confirmPasswordHandler}
          pattern={inputPatterns.confirmPasswordPattern}
          onBlur={() => focusHandler(setFocusedConfirmPassword)}
          onFocus={() => name === "confirmPassword" && setFocusedConfirmPassword(true)}
          focused={focusedConfirmPassword.toString()}
          required
        />
        <span className="InputError">{errorMessages.confirmPasswordError}</span>
      </form>
      <ReCAPTCHA
          sitekey={"6Lfbjs8fAAAAABVVOJa5zQnAg8-yhB4u5-MUbpdG"}
          className="ReCAPTCHA"
          onChange={reCaptchaHandler}
      />
      <div className="RegisterButton">
        <button className="Button" type="submit" form="registerForm">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
