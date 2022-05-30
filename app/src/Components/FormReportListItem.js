import '../Css/FormReportListItem.css';

import {useNavigate} from 'react-router-dom';

const FormReportListItem = (props) => {

    const navigate = useNavigate();

    const reportHandler = () => {
        navigate(props.formCode);
    }

    return(
        <div className="ItemContainer">
            <div className="ReportInfoContainer">
                <h1 className="FormName">{props.name}</h1>
                <h1 className="ExpiryDate">Expiring: {props.expiring}</h1>
            </div>
            <button className="ReportButton" onClick={reportHandler}>Report</button>
        </div>
    )
}

export default FormReportListItem;