import React from "react";
import UserInput from "./UserInput";
import { useState } from "react";

import "../Css/UserInput.css";
import "../Css/Form.css";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  /*Pewien sposób wstępnej walidacji danych, mona te za pomocą { useFormik } z biblioteki 'formik', mozliwe, ze lepiej */
  const errorMessages = {
    emailError: "Wrong email format!",
    nameError: "Name is required",
    surnameError: "Surname is required",
    passwordError: "Wrong password format!",
    confirmPasswordError: "Passwords don't match!",
  };

  const inputPatterns = {
    passwordPattern: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`,
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

  const submitHandler = (event) => {
    event.preventDefault();

    const userRegisterData = {
      name: name,
      surname: surname,
      email: email,
      password: password,
    };

    setEmail("");
    setName("");
    setSurname("");
    setPassword("");
    setConfirmPassword("");

    console.log(userRegisterData);
  };

  return (
    <div className="form">
      <h2>Register</h2>

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
          name="name"
          label="Name"
          type="text"
          // placeholder="Enter your name"
          required={true}
          className="input"
          value={name}
          onChange={nameHandler}
          errorMessage={errorMessages.nameError}

        />
        <UserInput
          name="surname"
          label="Surname"
          type="text"
          // placeholder="Enter your surname"
          required={true}
          className="input"
          value={surname}
          onChange={surnameHandler}
          errorMessage={errorMessages.surnameError}
          

        />
        <UserInput
          name="password"
          label="Password"
          type="password"
          // placeholder="Enter password"
          required={true}
          pattern={inputPatterns.passwordPattern}
          className="input"
          value={password}
          onChange={passwordHandler}
          errorMessage={errorMessages.passwordError}

        />
        <UserInput
          name="repeat-password"
          label="Repeat Password"
          type="password"
          // placeholder="Repeat password"
          required={true}
          pattern={inputPatterns.confirmPasswordPattern}
          className="input"
          value={confirmPassword}
          onChange={confirmPasswordHandler}
          errorMessage={errorMessages.confirmPasswordError}

        />

        <div className="captcha">
          //captcha do zrobienia, trzeba zainstalowac biblioteke googla itd
          captcha
        </div>
        <button className="C_button" type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
