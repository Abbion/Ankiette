import '../Css/PreLoginTemplateView.css';
import LoginComponent from '../Components/LoginComponent';

import { ReactSession } from 'react-client-session';
import {Navigate} from 'react-router-dom';

const LoginView = () =>
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
            <LoginComponent />
        </div>
    </div>
}

export default LoginView;