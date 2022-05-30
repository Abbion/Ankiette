import '../Css/BasicComponents.css'
import FormMiniature from './FormMiniature'

import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';

import Loading from '../Graphics/Icons/loading__.gif';


const YourFormsContent = () =>
{
    const requestData = {email: ReactSession.get("email")}
    const [order, setOrder] = useState("");
    const [searchBy, setSearchBy] = useState("");

    let [createdForms, setCreatedForms] = useState([]);
    let [attendedForms, setAttendedForms] = useState([]);

    let [responseForms, setResponseForms] = useState([]);
    let [shownForms, setShownForms] = useState([]);

    const [isLoading, setLoading] = useState(true)

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
                data.attended.forEach(elem => {
                    elem.isAttended = true
                })
                const tmp = data.created.concat(data.attended);
                setCreatedForms(data.created);
                setAttendedForms(data.attended);
                return tmp;
            }
        }).then(data => {
            setResponseForms(data);
            setShownForms(data);
            setLoading(false);
        })
        
    }, []);

    const orderByHandler = (e) => {
        e.preventDefault();
        switch (e.target.value) {
            case 'name' :
                setShownForms(shownForms.sort((a, b) => a.title.localeCompare(b.title)));
                setOrder("name");
                break;
            case 'date' :
                setShownForms(shownForms.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)));
                setOrder("date");
                break;
            case 'participants' :
                setShownForms(shownForms.sort((a, b) => (b.attended - a.attended)));
                setOrder("participants");
                break;
        }
    }

    const searchByHandler = (e) => {
        e.preventDefault();
        switch (e.target.value) {
            case 'all' :
                setShownForms(responseForms);
                setSearchBy("all");
                break;
            case 'open' :
                setShownForms(responseForms.filter(form => new Date(form.startDate) < new Date() && new Date(form.endDate) > new Date()));
                setSearchBy("open");
                break;
            case 'closed' :
                setShownForms(responseForms.filter(form => new Date(form.startDate) > new Date() || new Date(form.endDate) < new Date()));
                setSearchBy("closed");
                break;
            case 'created' :
                setShownForms(responseForms.filter(form => form.attended !== undefined));
                setSearchBy("created");
                break;
            case 'participated' :
                setShownForms(responseForms.filter(form => form.isAttended === true));
                setSearchBy("participated");
                break;
        }
    }

    const searchHandler = (e) => {
        e.preventDefault();
        setShownForms(responseForms.filter(form => form.title.toLowerCase().includes(e.target.value)));
    }

    let key = 0;

    return  (
         isLoading ?
             <div className="YourFromsContent">

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
                         <input type="text" className="Input" onKeyUp={searchHandler}/>
                     </div>

                     <div className="Filter">
                         <div className="FormsInfoText">Search</div>
                         <select className="Select" onChange={searchByHandler}>
                             <option value="all">all</option>
                             <option value="open">open</option>
                             <option value="closed">closed</option>
                             <option value="participated">participated</option>
                             <option value="created">created</option>
                         </select>
                     </div>
                 </div>

                 <div className="SeparationLine">

                 </div>
                 <img src={Loading} className={"Loading"}></img>
             </div>
             :
                <div className="YourFromsContent">

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
                            <input type="text" className="Input" onKeyUp={searchHandler}/>
                        </div>

                        <div className="Filter">
                            <div className="FormsInfoText">Search</div>
                            <select className="Select" onChange={searchByHandler}>
                                <option value="all">all</option>
                                <option value="open">open</option>
                                <option value="closed">closed</option>
                                <option value="participated">participated</option>
                                <option value="created">created</option>
                            </select>
                        </div>
                    </div>

                    <div className="SeparationLine">

                    </div>
                    <div className="Forms">
                        <div className="FormsGrid">
                            {
                                shownForms.map(form => {
                                    key += 1;
                                    return <FormMiniature key={form.code + key} name={form.title} formCode={form.code}
                                                          isAttended={form.isAttended}/>
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