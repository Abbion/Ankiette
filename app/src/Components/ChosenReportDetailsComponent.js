import '../Css/BasicComponents.css';

import ChoicesAnswerComponent from './ChoicesAnswerComponent';
import FormMiniature from './FormMiniature';
import Button from './Button';
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import { useState}  from "react";

const ChosenReportDetailsComponent = () => {
    const [crdate, setCrdate] = useState('15-04-2022');
    const [opdate, setOpdate] = useState('20-04-2022');
    const [cldate, setCldate] = useState('18-05-2022');
    const [participateCount, setParticipateCount] = useState(28);
    const [finishCount, setfinishCount] = useState(23);
    const [questionsCount, setQuestionsCount] = useState(5);

    return(
        <div className="ReportDetailsPanel">
            <div className="FormInfo">
                <div className="FormItem">
                    <FormMiniature/>
                    <div className="Footer"/>
                </div>
                <div className="FormDetails">
                    <h1>Creation date: {crdate}</h1>
                    <h1>Opened: {opdate}</h1>
                    <h1>Closed: {cldate}</h1>
                    <h1>Participants: {participateCount}</h1>
                    <h1>Finished: {finishCount}</h1>
                </div>
                <button className="CSVButton">Download detailed .csv</button>
            </div>
            <div className="QuestionsInfo">
                <div className="QuestionDetails">
                    <h1 className="QuestionNumber">Question 1</h1>
                    <ChoicesAnswerComponent percentage={58}/>
                </div>
                <div className="QuestionDetails">
                    <h1 className="QuestionNumber">Question 2</h1>
                    <ChoicesAnswerComponent percentage={23}/>
                </div>
                <div className="QuestionDetails">
                    <h1 className="QuestionNumber">Question 3</h1>
                    <ChoicesAnswerComponent percentage={69}/>
                </div>
            </div>
        </div>
    )
}

export default ChosenReportDetailsComponent