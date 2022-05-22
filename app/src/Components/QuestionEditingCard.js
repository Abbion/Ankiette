import '../Css/QuestionEditingCard.css'
import RedCross from '../Graphics/Icons/RedCross';
import SingleChoiceQuestionEditor from './SingleChoiceQuestionEditor';
import MultipleChoiceQuestionEditor from './MultipleChoiceQuestionEditor';
import ShortAndLongAnswerQuestionTitleInput from './ShortAndLongAnswerQuestionTitleInput';

import { useEffect, useState } from 'react';

const QuestionEditingCard = () => {

    const [questionType, setQuestionType] = useState(null);

    const questionTypeHandler = (e) => {

        switch(e.target.value) {
            case 'single-choice' :
                setQuestionType(<SingleChoiceQuestionEditor/>);
                break;
            case 'multiple-choice' :
                setQuestionType(<MultipleChoiceQuestionEditor/>);
                break;
            case 'short-answer' :
                setQuestionType(<ShortAndLongAnswerQuestionTitleInput/>);
                break;
            case 'long-answer' :
                setQuestionType(<ShortAndLongAnswerQuestionTitleInput/>);
                break;
            default :
                setQuestionType(null);
        }
    }

    return(
        <div className="Card">
            <div className="QuestionHeader">
                <h1 className="QuestionNumber">Question 1</h1>
                <div className="DeleteButton">
                    <RedCross />
                </div>
            </div>
            <div className="QuestionTypeField">
                <h1 className="QuestionTypeText">Select question type</h1>
                <select className="QuestionTypeSelector" onChange={questionTypeHandler}>
                    <option value="no-selection">Select question type</option>
                    <option value="single-choice">Single-choice question</option>
                    <option value="multiple-choice">Multiple-choice question</option>
                    <option value="short-answer">Short-answer question (100 char.)</option>
                    <option value="long-answer">Long-answer question (500 char.)</option>
                </select>
            </div>
            <h1 className="QuestionContentText">Question content:</h1>
            <div className="QuestionEditor" id="QuestionEditor">
                {questionType}
            </div>
        </div>
    )
}

export default QuestionEditingCard