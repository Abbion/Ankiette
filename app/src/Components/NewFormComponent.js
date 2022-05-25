import { useState } from 'react';
import '../Css/BasicComponents.css';
import '../Css/NewFormComponent.css';

import moment from 'moment';

import {useNavigate} from 'react-router-dom';
import { ReactSession } from 'react-client-session';


const NewFormComponent = () => {
    const navigate = useNavigate();

    const [minDate, setMinDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [minTime, setMinTime] = useState(moment(new Date()).format('HH:mm'));
    const [responseError, setResponseError] = useState("");

    const [formName, setFormName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [expiryTime, setExpiryTime] = useState("");
    
    const formNameHandler = (e) => {
      setFormName(e.target.value);
    }

    const expiryDateHandler = (e) => {
        setExpiryDate(e.target.value);
    }

    const expiryTimeHandler = (e) => {
        setExpiryTime(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        let endDate = expiryDate;
        const dateComponents = expiryDate.split("-");
        endDate = dateComponents.reverse();
        endDate = dateComponents.join("-");

        const endTime = expiryTime;

        const formData = {
            email: ReactSession.get("email"),
            title: formName,
            startDate: moment(new Date()).add(1, "minutes").format('DD-MM-YYYY HH:mm:ss'),
            endDate: endDate + " " + endTime + ":00"
        };

        let responseStatus = 0;

        fetch("http://localhost:8080/addForm", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                responseStatus = response.status;
                return response.json();
            })
            .then(data => {
                if(responseStatus === 200) {
                    console.log(data);
                    navigate('/editForm/' + data.code);
                } else setResponseError(data);
                return data;
            })

    }

    return <div className="NewFormPanel">
        <form className="NewFormForm" id={"newForm"} onSubmit={submitHandler}>
            <div className="NewFormNameContainer">


                <div className="Row">
                    <input
                        className="NewFormName"
                        type="text"
                        placeholder="Form name"
                        value={formName}
                        onChange={formNameHandler}
                        required
                    />
                </div>

                <div className="Row">
                    <label className="Title">Expiry Date:</label>
                    <input
                        className="ExpiryDateInput"
                        type="date"
                        required
                        min={minDate}
                        value={expiryDate}
                        onChange={expiryDateHandler}
                    />
                </div>

                <div className="Row">
                    <label className="Title">Expiry Time:</label>
                    <input
                        className="ExpiryTimeInput"
                        type="time"
                        required
                        value={expiryTime}
                        onChange={expiryTimeHandler}
                    />
                </div>

                <div className="Row">
                    <label className="Comment">Confirm Your initial setup to go the form questions creator.</label>
                </div>

                <div className="Row">
                    <button className="ConfirmButton" type="submit" form="newForm">
                        Confirm
                    </button>
                </div>



            </div>

        </form>
    </div>

}
export default NewFormComponent;