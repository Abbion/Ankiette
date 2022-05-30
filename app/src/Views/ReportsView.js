import Navbar from '../Components/Navbar';
import FormReportsListComponent from "../Components/FormReportsListComponent";

const ReportsView = () => {

    return <div className = "ChosenReportDetailsView" style={{width: "100%", height: "auto"}}>
        <Navbar/>
        <div>
            <FormReportsListComponent/>
        </div>
    </div>
}
export default ReportsView