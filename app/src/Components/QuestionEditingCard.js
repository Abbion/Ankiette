import '../Css/QuestionEditingCard.css'
import RedCross from '../Graphics/Icons/RedCross';
import SingleChoiceQuestionEditor from './SingleChoiceQuestionEditor';
import MultipleChoiceQuestionEditor from './MultipleChoiceQuestionEditor';
import ShortAndLongAnswerQuestionTitleInput from './ShortAndLongAnswerQuestionTitleInput';
import { useState } from 'react';

const QuestionEditingCard = (props) => {
    const [questionTypes] = useState([
        {
            label: "Select question type",
            value: "no-selection"
        },
        {
            label: "Single-choice question",
            value: "single-choice"
        },
        {
            label: "Multiple-choice question",
            value: "multiple-choice"
        },
        {
            label: "Short-answer question (100 char.)",
            value: "short-answer"
        },
        {
            label: "Long-answer qestion (500 char.)",
            value: "long-answer"
        }
    ]);

    const [selectedQuestionType, setSelectedQuestionType] = useState(0);

    function UpdateSelectedQuestionType(event){
        
        for(var itr = 0; itr < questionTypes.length; itr++)
        {
            if(questionTypes[itr].value === event.currentTarget.value)
                break;
        }
        
        setSelectedQuestionType(itr);
    }

    function RenderQuestionEditor()
    {
        switch(selectedQuestionType){
            case 1:
                return (<SingleChoiceQuestionEditor />);
            case 2:
                return (<MultipleChoiceQuestionEditor/>);
            case 3: case 4:
                return (<ShortAndLongAnswerQuestionTitleInput/>);
            default:
                return("");
        }
    }

    return(
        <div className="Card">
            <div className="QuestionHeader">
                <h1 className="QuestionNumber">Question {props.number}</h1>
                <div className="DeleteButton" onClick={props.RemoveQuestionFnc}>
                    <RedCross />
                </div>
            </div>

            <div className="QuestionTypeField">
                <h1 className="QuestionTypeText">Select question type</h1>
                <select className="QuestionTypeSelector" onChange={UpdateSelectedQuestionType}>
                    {questionTypes.map(type => (
                        <option key={type.value} value={type.value}>
                            {type.label} 
                        </option>
                    ))}
                </select>
            </div>

            <h1 className="QuestionContentText">  
                {selectedQuestionType !== 0 ? 'Question content:' : ''}
            </h1>
            

            <div className="QuestionEditor" id="QuestionEditor">
                {RenderQuestionEditor()}
            </div>
        </div>
    )
}

export default QuestionEditingCard