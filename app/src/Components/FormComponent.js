import { useState, useEffect } from "react";
import React from "react";
import {useNavigate, useParams} from 'react-router-dom';
import FillSingleChoiceQuestion from "../Components/FillSingleChoiceQuestionComponent";
import FillMultipleChoiceQuestion from "../Components/FillMultipleChoiceQuestionComponent";
import FillLongAndShortAnswer from "../Components/FillLongAndShortAnswerQuestionComponent";
import "../Css/FillForm.css";
import "../Css/BasicComponents.css";

const FormComponent = (props) => {

    let { formCode } = useParams();

    const [formBody, setFormBody] = useState([]);

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
                
                setFormBody(data);
                // setFormBody(JSON.stringify(data));
                return data;
            } else {
                console.log("Wrong URL! Form might be expired.");
            }
        });
    }, []);

    

    const FillQuestionType = (question) =>
    {
        switch(question.type){
            case 1:
                return (<FillSingleChoiceQuestion content={question.body.content} answers={question.body.answers}  />);
            case 2:
                return (<FillMultipleChoiceQuestion content={question.body.content} answers={question.body.answers} />);
            case 3: case 4:
                return (<FillLongAndShortAnswer content={question.body.content}/>);
            default:
                return("");
        }
    }


    // return <div className="formComponent">
        
    //     <form>
    //         {
    //         React.Children.toArray(formBody.map(question => {
    //             return FillQuestionType(question)
    //         }))
    //     }
    //     {/* <button type="button"></button> */}
    //     </form>
    
    // </div>
return <div className = "form-component">
    <div className="questions-container">
        <h1 className="form-name">
            {props.formName}
        </h1>

        <div className="questions">
        {
            React.Children.toArray(formBody.map(question => {
                return FillQuestionType(question)
            }))
        }
        </div>

        

        

        <button className="submit-button">
            <h1>Submit/Next Page</h1>
        </button>
    </div>
    </div>
}
export default FormComponent