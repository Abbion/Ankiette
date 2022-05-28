import '../Css/BasicComponents.css';
import { useState, useEffect }  from "react";
import { ReactSession } from 'react-client-session';
import ReportSingleQuestionComponent from "./ReportSingleQuestionComponent";

import Loading from '../Graphics/Icons/loading__.gif';

const ReportDetailsComponent = (props) => {

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let responseStatus = 0;
        let requestData = {
            formCode: props.formCode,
            email: ReactSession.get("email")
        }

        fetch("http://localhost:8080/getAnswers", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(requestData)
        }).then(response => {
            responseStatus = response.status;
            return response.json();
        }).then(data => {
            setQuestions(data);
            setIsLoading(false);
        })


    }, []);


    let key = 0;
    return (
        isLoading ?
            <div className="QuestionsBlock">
                <div className="QuestionsInfo">
                    <img src={Loading} className={"Loading"} style={{margin: "auto"}}></img>
                </div>
            </div>
        :
            <div className="QuestionsBlock">
                <div className="QuestionsInfo">
                    <div className="QuestionDetails">
                        {
                            questions.map(question => {
                                console.log(question)
                                key += 1;
                                return (
                                    <ReportSingleQuestionComponent key={key} name={question.content} type={question.type} answers={question.answers} participants={props.participants}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
    )
}

export default ReportDetailsComponent