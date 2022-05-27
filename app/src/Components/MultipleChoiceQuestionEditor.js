import { useState } from 'react'
import '../Css/QuestionEditor.css'
import RedCross from '../Graphics/Icons/RedCross';

const MultipleChoiceQuestionEditor = () => {
    const [answer, setAnswer] = useState([getAnserDiv(0), getAnserDiv(1)]);
    const [nextID, setNextId] = useState(2);

    function getAnserDiv(id)
    {
        return (     <div className="QuestionItem" id={id} key={id}>
        <input type="checkbox" name="correct-answer" className="RadioButton"></input>
            <input type="text" className="QuestionInput multipleAnswer"></input>

        {id > 1 ? <div className="DeleteAnswer" style={{paddingLeft: "0.5em", cursor: "pointer"}} onClick={(callback) => {removeAnswerAt(id)}}> 
            <RedCross/> 
            </div> : ''}
        </div>);
    }

    function addAddAnswer(){
        setAnswer(prevAnswers => [...prevAnswers, getAnserDiv(nextID)]);
        setNextId(prevState => prevState + 1);
        
    }

    function removeAnswerAt(id)
    {
        setAnswer((prevState) => prevState.filter((index) => {
            return index.key != id;
        }));
    }


    return(
        <div className="QuestionEditorContainer">
            <input type="text" className="QuestionInput multipleQuestionInput"></input>
            <div className="EditedQuestionsList">
                {answer}
            </div>
            <button className="AddNewAnswerButton" onClick={addAddAnswer}>Add an answer</button>
        </div>
    )
}

export default MultipleChoiceQuestionEditor