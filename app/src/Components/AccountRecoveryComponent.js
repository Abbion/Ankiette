import '../Css/AccountRecoveryComponent.css'
import '../Css/BasicComponents.css'
import Logo from '../Graphics/Logo/Logo'

import { ReactSession } from 'react-client-session';
import {useNavigate} from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'
import {useState} from "react";

const AccountRecoveryComponent = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [responseError, setResponseError] = useState("");

    const emailHandler = (e) => {
        setEmail(e.target.value);
        console.log(email);
    }

    const codeHandler = (e) => {
        setCode(e.target.value);
        console.log(code);
    }

    const sendCodeHandler = (e) => {
        e.preventDefault();

        const requestData = {
            email: email,
        };

        let responseStatus = 0;

        fetch("http://localhost:8080/sendCode", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        }).then(response => {
            responseStatus = response.status;
            return response.json();
        })
            .then(data => {
                if(responseStatus === 200) {
                    console.log(data);
                    return data;
                }else setResponseError(data);
            })
        setEmail("");
        setResponseError("");
    };

    return <div className="AccountRecoveryPanel">
        <div className="Logo">
            <Logo />
            <p className="LogoName">ANKIETTE</p>
        </div>
        <div className="TabName">
            <h1>Recover account</h1>
        </div>
        <div className="RecoveryInstruction">
            <h1>To recover your account, provide your email and enter an 8 digit code that was sent to you via email.</h1>
        </div>
        <div className="InputField">
            <label className="InputLabel">Email</label>
            <input
                className="Input"
                name="email"
                type="email"
                value={email}
                onChange={emailHandler}
                required
            />
        </div>
        <button className="Button">Send code</button>
        <div className="InputField">
            <label className="InputLabel">8 digit code</label>
            <input
                className="Input"
                name="code"
                type="code"
                value={code}
                onChange={codeHandler}
            />
        </div>
        <ReCAPTCHA
            sitekey={"6Lfbjs8fAAAAABVVOJa5zQnAg8-yhB4u5-MUbpdG"}
            className="ReCAPTCHA"
        />
        <button className="Button">Recover account</button>
    </div>
}

export default AccountRecoveryComponent