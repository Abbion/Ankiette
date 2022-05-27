import '../Css/QuestionEditor.css'

const ShortAndLongAnswerQuestionTitleInput = (props) => {

    const additionalClass = props.which;
    const basicClass = "QuestionInput";
    const resultClass = basicClass + " " + additionalClass;
    return(
        <input className={resultClass}></input>
    )
}

export default ShortAndLongAnswerQuestionTitleInput