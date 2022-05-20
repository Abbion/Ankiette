import '../Css/BasicComponents.css'
import FormMiniature from './FormMiniature'

import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';


const YourFormsContent = () =>
{
    const requestData = {email: ReactSession.get("email")}
    const [order, setOrder] = useState("");

    let [responseForms, setResponseForms] = useState([]);
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
                setResponseForms(data);
                return data;
            }
        })
    }, []);


    const orderByHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        switch (e.target.value) {
            case 'name' :
                responseForms = responseForms.sort((a, b) => a.title.localeCompare(b.title));
                setOrder("name");
                break;
            case 'date' :
                responseForms = responseForms.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                setOrder("date");
                break;
        }
    }

    return  (<div className="YourFromsContent">

        <div className="FormsInfoAndFilters">
            <h1>Your forms</h1>
            
            <div className="OrderBy">
                <div className="FormsInfoText">Order by</div>
                <select className="Select" onChange={orderByHandler} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT" hidden></option>
                    <option value="name">name</option>
                    <option value="date">date</option>
                    <option value="participants">participants</option>
                </select>
            </div>

            <div className="Search">
                <div className="FormsInfoText">Search</div>
                <input type="text" className="Input"/>
            </div>

            <div className="Filter">
                <div className="FormsInfoText">Search</div>
                <select className="Select">
                    <option>all</option>
                    <option>open</option>
                    <option>closed</option>
                    <option>participated</option>
                    <option>created</option>
                </select>
            </div>
         </div>
        
        <div className="SeparationLine">

        </div>

         <div className="Forms">
             <div className="FormsGrid">
                 {
                     responseForms.sort((a, b) => a.title - b.title).map(form => {
                         return <FormMiniature key={form.code} name={form.title}/>
                     })
                 }
            </div>
         </div>
        
        <div className="Footer">
            
        </div>
    </div>
    )
}

export default YourFormsContent