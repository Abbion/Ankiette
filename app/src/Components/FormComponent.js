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

const FormComponent = (props) => {

    let { formCode } = useParams();
    const navigate = useNavigate();

    const [formBody, setFormBody] = useState([]);
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
                console.log(data);
                
                setFormBody(data);
                return data;
            } else {
                console.log("Wrong URL! Form might be expired.");
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
        
        let allQuestionsNumber = document.querySelectorAll(".question-card").length;
        console.log(allQuestionsNumber);

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
        console.log(jsonObj)

        

        let responseStatus = 0;
        fetch("http://localhost:8080/addAnswers", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(addAnswersObject)
        }).then(response => {
            responseStatus = response.status;
            console.log(response);
            return response.json();
        }).then(data => {
            alert("Dziekujemy za uzupelnienie ankiety");
            
            navigate('/home');
        })

    }


  
return <div className = "form-component">
    <div className="questions-container">
        <h1 className="form-name">
            <div className="user-img"></div>
            {formBody.title}
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
}
export default FormComponent