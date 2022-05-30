import '../Css/FormReportsListComponent.css';
import FormReportListItem from './FormReportListItem';
import {useState, useEffect} from "react";
import { ReactSession } from 'react-client-session';
import FormMiniature from "./FormMiniature";

import Loading from '../Graphics/Icons/loading__.gif';

const FormReportsListComponent = () => {

    const [formList, setFormlist] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const requestData = {
        email: ReactSession.get("email")
    }

    let responseStatus = 0;
    useEffect(() => {
        fetch("http://localhost:8080/getAllForms", {
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
                setFormlist(data.created);
            }
        }).then(data => {
            setLoading(false);
        })

    }, []);

    let key=0;

    return(
        isLoading ?
            <div className="FormReportsListPanel">
                <img src={Loading} className={"Loading"}></img>
            </div>
        :
            <div className="FormReportsListPanel">
                <h1 className="PageName">Reports</h1>
                <div className="FormReportsContainer">
                    {
                        formList.map(form => {
                            key += 1;
                            return <FormReportListItem
                                key={form.code + key}
                                name={form.title}
                                formCode={form.code}
                                expiring={form.endDate}
                            />
                        })
                    }
                </div>
            </div>
    )
}

export default FormReportsListComponent;