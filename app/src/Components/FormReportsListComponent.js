import '../Css/FormReportsListComponent.css';
import FormReportListItem from './FormReportListItem';

const FormReportsListComponent = () => {
    return(
        <div className="FormReportsListPanel">
            <h1 className="PageName">Reports</h1>
            <div className="FormReportsContainer">
                <FormReportListItem />
                <FormReportListItem />
                <FormReportListItem />
                <FormReportListItem />
                <FormReportListItem />
                <FormReportListItem />
            </div>
        </div>
    )
}

export default FormReportsListComponent;