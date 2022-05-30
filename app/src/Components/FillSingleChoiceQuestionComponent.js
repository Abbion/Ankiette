import React, { useState } from "react";

const FillSingleChoiceQuestion = (props) => {
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
                {
                    React.Children.toArray(props.answers.map((ans, index) => (
                        <div key={index} className="answer-item">
                            <input type="radio" className="radio-button single-answer" name={questionId} id={index} value={ans} onChange={changeHandler} required={isRequired}/>
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