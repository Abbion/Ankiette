import React, { useState } from "react";


const FillLongAndShortAnswer = (props) => {
    const [userAnswer, setUserAnswer] = useState("");
    const questionId = props.id;
    const isRequired =props.required;



    const changeHandler = (e) => {
        
        setUserAnswer(e.target.value);
        // props.callback(questionId, userAnswer);


    }

    return (
        <div className="question-card">
            <div className="question-title">
                <h1 className="question-number">Question {questionId+1}</h1>
            </div>
            <div className="question-content-container">

            <div className="question-text-container">
                    <h1 className="question-text">  
                        {props.content}
                    </h1>
                </div>
           
            <div className="answers-container">
            {/* <input value={userAnswer} className="answer text-input" onChange={changeHandler}/> */}
            <div className="answer-item">

            <textarea value={userAnswer} className="answer text-input" name={questionId} onChange={changeHandler} required={isRequired}/>
            </div>
            </div>
            </div>
        </div>
    )
}

export default FillLongAndShortAnswer;