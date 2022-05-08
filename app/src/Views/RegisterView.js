import '../Css/TemplateView.css'
import RegisterComponent from '../Components/RegisterComponent'

import { ReactSession } from 'react-client-session';
import {Navigate} from 'react-router-dom';

const RegisterView = () =>
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
                <RegisterComponent />
            </div>
        </div>
}

export default RegisterView;