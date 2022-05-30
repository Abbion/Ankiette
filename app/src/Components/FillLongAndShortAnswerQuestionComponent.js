import React, { useState } from "react";


const FillLongAndShortAnswer = (props) => {
    const [userAnswer, setUserAnswer] = useState("");

    const changeHandler = (e) => {
        setUserAnswer(e.target.value);
        console.log(userAnswer);
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
           
            <div className="answer-container">
            <input value={userAnswer} className="answer" onChange={changeHandler}/>
            </div>
            </div>
        </div>
    )
}

export default FillLongAndShortAnswer;