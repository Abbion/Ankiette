import '../Css/BasicComponents.css';

import ChoicesAnswerComponent from './ChoicesAnswerComponent';
import FormMiniature from './FormMiniature';
/* import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom'; */
import { useState }  from "react";

const ChosenReportDetailsComponent = () => {
    const [crdate, setCrdate] = useState('15-04-2022');
    const [opdate, setOpdate] = useState('20-04-2022');
    const [cldate, setCldate] = useState('18-05-2022');
    const [participateCount, setParticipateCount] = useState(28);
    const [finishCount, setfinishCount] = useState(23);

    return(
        <div className="ReportDetailsPanel">
            <div className="FormInfo">
                <div className="FormItem">
                    <FormMiniature/>
                    <div className="Footer"/>
                </div>
                <div className="FormDetails">
                    <div className="BasicInfo">
                        <h1>Creation date: {crdate}</h1>
                        <h1>Opened: {opdate}</h1>
                        <h1>Closed: {cldate}</h1>
                        <h1>Participants: {participateCount}</h1>
                        <h1>Finished: {finishCount}</h1>
                    </div>
                    <button className="CSVButton">Download detailed .csv</button>
                </div>
            </div>
            <div className="QuestionsBlock">
                <div className="QuestionsInfo">
                    <div className="QuestionDetails">
                        <h1 className="QuestionNumber">Question 1</h1>
                        <ChoicesAnswerComponent text={"Answer 1"} percentage={58}/>
                        <ChoicesAnswerComponent text={"Answer 2"} percentage={42}/>
                    </div>
                    <div className="QuestionDetails">
                        <h1 className="QuestionNumber">Question 2</h1>
                        <ChoicesAnswerComponent text={"Answer 1"} percentage={23}/>
                        <ChoicesAnswerComponent text={"Answer 2"} percentage={0}/>
                        <ChoicesAnswerComponent text={"Answer 3"} percentage={67}/>
                        <ChoicesAnswerComponent text={"Answer 4"} percentage={4}/>
                    </div>
                    <div className="QuestionDetails">
                        <h1 className="QuestionNumber">Question 3</h1>
                        <ChoicesAnswerComponent text={"Answer 1"} percentage={95}/>
                        <ChoicesAnswerComponent text={"Answer 2"} percentage={43}/>
                        <ChoicesAnswerComponent text={"Answer 3"} percentage={25}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChosenReportDetailsComponent