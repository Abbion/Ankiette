import '../Css/QuestionEditor.css'

import React from 'react';
import {useState} from 'react';

const SingleChoiceQuestionEditor = () => {
    //<input type="radio" name="correct-answer" className="RadioButton"></input>

    let [elements, setElements] = useState([]);
    let [counter, setCounter] = useState(0);

    const addAnswerHandler = () => {
        let answerInput = React.createElement("input", {type: "text", className: "QuestionInput", placeholder: "Answer"});
        let questionItem = React.createElement("div", {className: "QuestionItem", key: counter}, answerInput);

        setCounter(counter+1);
        setElements(elements => [...elements, questionItem]);
        //<div className="QuestionItem">
        //    <input type="text" className="QuestionInput" placeholder={"Answer"}></input>
        //</div>
    }

    return(
        <div className="QuestionEditorContainer">
            <input type="text" className="QuestionInput" placeholder={"Question content."}></input>
            <div className="EditedQuestionsList">
                {elements}
            </div>
            <button className="AddNewAnswerButton" onClick={addAnswerHandler}>Add an answer</button>
        </div>
    )
}

export default SingleChoiceQuestionEditor