import '../Css/BasicComponents.css';
import { useState, useEffect }  from "react";

import ChoicesAnswerComponent from './ChoicesAnswerComponent';

import { ReactSession } from 'react-client-session';

const ReportSingleQuestionComponent = (props) => {

    const [answers, setAnswers] = useState(props.answers);



    let isChoiceAnswer;
    if(props.type === 1 || props.type === 2) {
        isChoiceAnswer = true;
    } else {
        isChoiceAnswer = false;
    }

    let key = 0;
    return (
        isChoiceAnswer ?
            <div>
                <h1 className="QuestionNumber">{props.name}</h1>
                {
                        answers.map(answer => {
                            key += 1;
                            let percentage;
                            if(answer[1] === 0) {
                                percentage = 0;
                            } else {
                                percentage = Math.round(((answer[1] / props.participants) * 100)*100)/100;
                            }
                            return <ChoicesAnswerComponent key={key} text={answer[0]} percentage={percentage}/>
                        })
                }
            </div>
            :
            <div>
                <h1 className="QuestionNumber">{props.name}</h1>
                {
                    answers.map(answer => {
                        key += 1;
                        return <div key={key} className="ShortLongReportAnswer">{answer}</div>
                    })
                }
            </div>


    )

}

export default ReportSingleQuestionComponent