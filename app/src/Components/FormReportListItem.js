import '../Css/FormReportListItem.css';

const FormReportListItem = () => {
    return(
        <div className="ItemContainer">
            <div className="ReportInfoContainer">
                <h1 className="FormName">Form name</h1>
                <h1 className="ExpiryDate">Expiring: 15.04.2021 12:30</h1>
            </div>
            <button className="ReportButton">Report</button>
        </div>
    )
}

export default FormReportListItem;