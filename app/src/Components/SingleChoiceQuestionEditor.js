import '../Css/QuestionEditor.css'

const SingleChoiceQuestionEditor = () => {
    return(
        <div className="QuestionEditorContainer">
            <input type="text" className="QuestionInput"></input>
            <div className="EditedQuestionsList">
                <div className="QuestionItem">
                    <input type="radio" name="correct-answer" className="RadioButton"></input>
                    <input type="text" className="QuestionInput"></input>
                </div>
                <div className="QuestionItem">
                    <input type="radio" name="correct-answer" className="RadioButton"></input>
                    <input type="text" className="QuestionInput"></input>
                </div>
            </div>
            <button className="AddNewAnswerButton">Add an answer</button>
        </div>
    )
}

export default SingleChoiceQuestionEditor