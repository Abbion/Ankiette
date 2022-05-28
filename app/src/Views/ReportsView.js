import Navbar from '../Components/Navbar';

import FormReportsListComponent from "../Components/FormReportsListComponent";

const ReportsView = () => {

    return <div className = "ChosenReportDetailsView">
        <Navbar/>
        <div>
            <FormReportsListComponent/>
        </div>
    </div>
}
export default ReportsView