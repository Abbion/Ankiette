import { useState, useEffect } from "react";
import React from "react";
import { useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import { ReactSession } from 'react-client-session';
import FillSingleChoiceQuestion from "../Components/FillSingleChoiceQuestionComponent";
import FillMultipleChoiceQuestion from "../Components/FillMultipleChoiceQuestionComponent";
import FillLongAndShortAnswer from "../Components/FillLongAndShortAnswerQuestionComponent";
import "../Css/FillForm.css";
import "../Css/BasicComponents.css";

import Loading from '../Graphics/Icons/loading__.gif';

const FormComponent = (props) => {

    let { formCode } = useParams();
    const navigate = useNavigate();

    const [formBody, setFormBody] = useState([]);
    const [errBody, setErrBody] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isFilled, setIsFilled] = useState(false);

    const requestData = {code: formCode, email: ReactSession.get("email")};
    let responseStatus = 0;
    let answersToReturn = [];


    const addAnswersObject = {
        email: requestData.email,
        formCode: requestData.code,
        answers: answersToReturn
    }



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
                setFormBody(data);
                setIsLoading(false);
                return data;
            } else {
                setErrBody("Wrong URL! Form might be expired.")
            }
        });
    }, []);

    

    const FillQuestionType = (question, index) =>
    {
        switch(question.type){
            case 1:
                return (<FillSingleChoiceQuestion id={index} content={question.body.content} answers={question.body.answers} required={question.body.required}  />);
            case 2:
                return (<FillMultipleChoiceQuestion id={index} content={question.body.content} answers={question.body.answers} required={question.body.required}/>);
            case 3: case 4:
                return (<FillLongAndShortAnswer id={index} content={question.body.content} required={question.body.required}/>);
            default:
                return("");
        }
    }



    const submitHandler = () => {

        setIsLoading(true);
        setIsFilled(true);

        let allQuestionsNumber = document.querySelectorAll(".question-card").length;

        let allAnswers = document.querySelectorAll(".answer-item");

        for(let i = 0; i < allQuestionsNumber; i++) {
            let allAnswers = document.getElementsByName(i.toString());
            let checkboxAns = [];
            
            
            let numberOfCheckedAnswers = 0;
            allAnswers.forEach(an => {
                if(an.type !== "textarea") {
                    if(an.checked) numberOfCheckedAnswers++;
                }
            })

            let ansType = null;


            allAnswers.forEach(an => {
                ansType = an.type;
                if(an.type == "textarea") {
                    answersToReturn.push(an.value);
                } else if(an.type == "checkbox") {
                    if(numberOfCheckedAnswers == 0) {
                        
                    } else {
                        if(an.checked) checkboxAns.push(an.value);
                    }
                } else {
                    if(numberOfCheckedAnswers == 0) answersToReturn.push("");
                    else {
                        if(an.checked) {
                            answersToReturn.push(an.value);
    
                        }
                    }
                }
                
                }
            );
            if(ansType == "checkbox" && numberOfCheckedAnswers !== 0) answersToReturn.push(checkboxAns);
            if(ansType == "checkbox" && numberOfCheckedAnswers == 0) answersToReturn.push([]);



            

        }
        const jsonObj = JSON.stringify(addAnswersObject);


        let responseStatus = 0;
        fetch("http://localhost:8080/addAnswers", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(addAnswersObject)
        }).then(response => {
            responseStatus = response.status;
            return response.json();
        }).then(data => {
            setIsLoading(false);
            setIsFilled(false);
            navigate('/home');
        })

    }


  
return ( isLoading ?
    <div className = "form-component">
        <img src={Loading} className={"Loading"}></img>
        {isFilled ? <h1 style={{fontSize: '30px'}}>Thank you for filling form. We are saving your answers...</h1> :  <h1 style={{fontSize: '30px'}}>Loading form...</h1>}
    </div>
        :

    <div className = "form-component">
    <div className="questions-container">
        <h1 className="form-name">
            <div className="user-img"></div>
            {formBody.title}
            {errBody}
        </h1>

        {formBody.questions && 
        <div className="questions">
        {
            React.Children.toArray(formBody.questions.map((question, index) => {
                return FillQuestionType(question, index)
            }))
        }
        <button className="submit-button" onClick={submitHandler}>
            <h1>Submit/Next Page</h1>
        </button>
        </div>
        }
    </div>
    </div>
)
}
export default FormComponent