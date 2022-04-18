import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types'
import "../Css/UserInput.css";



const UserInput = ({name, label, errorMessage, className, type, value, placeholder, onChange, pattern, required} ) => {
    const [focused, setFocused] = useState(false);
    const handleFocus = (e) => {
        setFocused(true);
    };


    return (
        <div className="input-container">
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                pattern={pattern}
                className={className}
                required={required}
                onBlur={handleFocus}
                onFocus={() =>
                    name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    );
};

UserInput.defaultProps = {
    className: "input",

}

export default UserInput;