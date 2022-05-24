import '../Css/PreLoginTemplateView.css';
import AccountRecoveryComponent from '../Components/AccountRecoveryComponent';

import { ReactSession } from 'react-client-session';
import {Navigate} from 'react-router-dom';

const AccountRecoveryView = () =>
{
    if(ReactSession.get("isAuthenticated")) {
        return <Navigate to={"/home"} />
    }
    return <div className = "TemplateView">
        <div className = "LeftSide">
            <div className = "CatchPhrase">
                Tick your data in one place with Ankiette
            </div>
        </div>
        <div className = "RightSide">
            <AccountRecoveryComponent />
        </div>
    </div>
}

export default AccountRecoveryView;