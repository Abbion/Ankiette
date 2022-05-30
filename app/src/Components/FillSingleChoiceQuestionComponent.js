import React, { useState } from "react";

const FillSingleChoiceQuestion = (props) => {
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
                {
                    React.Children.toArray(props.answers.map((ans, index) => (
                        <div key={index} className="answer-item">
                            <input type="radio" className="radio-button" name={props.content} id={ans} value={ans} onChange={changeHandler}/>
                            <label htmlFor={ans}  className="answer">{ans}</label>
                        </div>
                        
                    )))

                }
                </div>
                
            </div>
            

        </div>
    )
}

export default FillSingleChoiceQuestion;