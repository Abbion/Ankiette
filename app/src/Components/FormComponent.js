import { useState, useEffect } from "react";

import {useNavigate, useParams} from 'react-router-dom';


const FormComponent = () => {

    let { formCode } = useParams();

    const [formBody, setFormBody] = useState("");

    const requestData = {code: formCode}
    let responseStatus = 0;
    useEffect(() => {
        fetch("http://localhost:8080/getForm", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(requestData)
        }).then(response => {
            responseStatus = response.status;
            return response.json();
        }).then(data => {
            if(responseStatus === 200) {
                console.log(data);
                setFormBody(JSON.stringify(data));
                return data;
            } else {
                console.log("Wrong URL! Form might be expired.");
            }
        });
    }, []);



    return <div>
        {formBody}
    </div>
}
export default FormComponent