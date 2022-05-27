import '../Css/ChosenReportDetailsView.css';
import ChosenReportDetailsComponent from '../Components/ChosenReportDetailsComponent.js';
import Navbar from '../Components/Navbar';

import {useNavigate, useParams} from 'react-router-dom';

const ChosenReportDetailsView = () =>
{
    let { formCode } = useParams();

    return <div className = "ChosenReportDetailsView">
        <Navbar/>
        <div>
            <ChosenReportDetailsComponent formCode={formCode}/>
        </div>
    </div>
}

export default ChosenReportDetailsView;