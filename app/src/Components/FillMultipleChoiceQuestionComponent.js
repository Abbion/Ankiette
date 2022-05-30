import React, { useState } from "react";
import "../Css/FillForm.css";


const FillMultipleChoiceQuestion = (props) => {
    const [checked, setChecked] = useState([]);

    const checkHandler = (e) => {
        let updatedCheckedList = [...checked];
        if(e.target.checked) {
            updatedCheckedList = [...checked, e.target.value];
        } else {
            updatedCheckedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedCheckedList);

        console.log(checked);

    }

    return (
        <div className="question-card">
            <div className="question-title">
                <h1 className="question-number">Question {props.number}</h1>
            </div>
            <div className="question-content-container">
                <div className="question-text-container">
                    <h1 className="question-text">  
                        {props.content}
                    </h1>
                </div>
                
                <div className="answers-container">
                {
                    React.Children.toArray(props.answers.map((ans, index) => (
                        <div key={index} className="answer-item">
                            <input type="checkbox" className="radio-button" id={ans} value={ans} onChange={checkHandler} />
                            <label htmlFor={ans} className="answer">{ans}</label>
                        </div>  
                    )))
                }
                </div>
            </div>
            
        </div>
    )
}

export default FillMultipleChoiceQuestion;