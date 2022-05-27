import '../Css/ChosenReportDetailsView.css';
import ChosenReportDetailsComponent from '../Components/ChosenReportDetailsComponent.js';
import Navbar from '../Components/Navbar';

const ChosenReportDetailsView = () =>
{
    return <div className = "ChosenReportDetailsView">
        <Navbar/>
        <div>
            <ChosenReportDetailsComponent/>
        </div>
    </div>
}

export default ChosenReportDetailsView;