import '../Css/BasicComponents.css';

import ChoicesAnswerComponent from './ChoicesAnswerComponent';
import FormMiniature from './FormMiniature';
import { useState, useEffect }  from "react";

import Loading from '../Graphics/Icons/loading__.gif';
import ReportDetailsComponent from "./ReportDetailsComponent";

const ChosenReportDetailsComponent = (props) => {

    const [isLoading, setLoading] = useState(true)

    const [crdate, setCrdate] = useState('');
    const [opdate, setOpdate] = useState('');
    const [cldate, setCldate] = useState('');

    const [formTitle, setFormTitle] = useState('');
    const [participateCount, setParticipateCount] = useState("");

    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        let responseStatus = 0;
        let requestData = {
            code: props.formCode
        }

        fetch("http://localhost:8080/getFormDetails", {
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
                setFormTitle(data.title);
                setCldate(data.endDate);
                setOpdate(data.startDate);
                setCrdate(data.startDate);
                setParticipateCount(data.participants);
                setLoading(false);
            }
        })

    }, []);

//<button className="CSVButton">Download detailed .csv</button>
    return(
        isLoading ?
            <div className="ReportDetailsPanel">
                <img src={Loading} className={"Loading"}></img>
            </div>
        :
            <div className="ReportDetailsPanel">
                <div className="FormInfo">
                    <div className="FormItem">
                        <FormMiniature name={formTitle} formCode={props.formCode} />
                        <div className="Footer"/>
                    </div>
                    <div className="FormDetails">
                        <div className="BasicInfo">
                            <h1>Creation date: {crdate}</h1>
                            <h1>Opened: {opdate}</h1>
                            <h1>Closed: {cldate}</h1>
                            <h1>Participants: {participateCount}</h1>
                        </div>

                    </div>
                </div>
                <ReportDetailsComponent formCode={props.formCode} participants={participateCount}/>
            </div>
    )
}

export default ChosenReportDetailsComponent