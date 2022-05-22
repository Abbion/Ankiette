import '../Css/CreateForm.css';
import '../Css/BasicComponents.css';
import { useEffect, useState } from 'react';
import QuestionEditingCard from './QuestionEditingCard';


const AddQuestionComponent = (props) =>
{
    const [questionArr, setQuestionArr] = useState([]);
    const [key, setNewKey] = useState(0);
    const [questionNumbers, setQuestionNumber] = useState([1]);
    const [removeIndex, setRemoveIndes] = useState(-1);

    function onAddQuestionClicked(){
        setQuestionArr(prevState => [...prevState,
                        <QuestionEditingCard 
                        key={key} 
                        number={questionNumbers[questionNumbers.length - 1]}
                        RemoveQuestionFnc={ (delFunc) => onDeleteClicked(key) }/>,
                    ]);
        setQuestionNumber(prevState => [...prevState, prevState[questionNumbers.length - 1] + 1]);
        setNewKey(prevKey => prevKey + 1 );
    }

    function onDeleteClicked(questionNumber){
        setRemoveIndes(questionNumber);
    }

    useEffect(() => {

        setQuestionArr((prevState) => prevState.filter((index) => {
            return index.key != removeIndex;
        }));

    }, [removeIndex])

    return <div className = "AddQuestionComponent">
        <div className="AddAndConfirm">
            <h1 className="FormName">
                {props.formName}
            </h1>

            <div className="Questions">
                {questionArr}
            </div>

            <button className="Button" onClick={onAddQuestionClicked}>
                <h2>+</h2>
                <h1>Add question</h1>
            </button>

            <h1 className="ConfirmInfo">
                Confirm and create new form - Your form will be saved and You will be able to share it.
            </h1>

            <button className="Button ConfirmButton">
                <h1>Confirm</h1>
            </button>
        </div>
    </div>
}

export default AddQuestionComponent