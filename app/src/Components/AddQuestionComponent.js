import '../Css/CreateForm.css'
import '../Css/BasicComponents.css'
import { useState } from 'react';

const AddQuestionComponent = () =>
{
    const [questionArr, setQuestionArr] = useState([]);
    const [key, setNewKey] = useState(0);

    function onAddQuestionClicked(){
        console.log("Add question");

        setQuestionArr(prevState => [...prevState, <div key={key} className="QTemplate"/> ]);
        setNewKey(prevKey => prevKey + 1 );
        console.log(questionArr);
    }

    return <div className = "AddQuestionComponent">
        <div className="AddAndConfigm">
            <h1 className="FormName">
                My new form
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