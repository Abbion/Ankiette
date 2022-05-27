import '../Css/BasicComponents.css';

import ChoicesAnswerComponent from './ChoicesAnswerComponent';
import FormMiniature from './FormMiniature';
import { ReactSession } from 'react-client-session';
import { useState, useEffect }  from "react";

import Loading from '../Graphics/Icons/loading__.gif';

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
            email: ReactSession.get("email")
        }

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
                data.created.forEach(elem => {
                    if(elem.title === formTitle) {
                        setOpdate(elem.startDate);
                        setCrdate(elem.startDate);
                        setCldate(elem.endDate);
                        setParticipateCount(elem.attended);
                        setLoading(false);
                    }
                })
            }
        })

    })


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
                    <button className="CSVButton">Download detailed .csv</button>
                </div>
            </div>
            <div className="QuestionsBlock">
                <div className="QuestionsInfo">
                    <div className="QuestionDetails">
                        {

                        }
                        <h1 className="QuestionNumber">Question 1</h1>
                        <ChoicesAnswerComponent text={"Answer 1"} percentage={58}/>
                        <ChoicesAnswerComponent text={"Answer 2"} percentage={42}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChosenReportDetailsComponent