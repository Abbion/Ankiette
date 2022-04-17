import React from "react";
import { useState } from "react";


const UserInput = (props) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };


  return (
    <div className="input-container">
      <label htmlFor={props.name}>{props.label}</label>
      

      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        pattern={props.pattern}
        className={props.className}
        required
        onBlur={handleFocus}
        onFocus={() =>
          props.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>{props.errorMessage}</span>
    </div>
  );
};

export default UserInput;
