import '../Css/TemplateView.css';
import '../Css/BasicComponents.css';

import { ReactSession } from 'react-client-session';
import {useNavigate} from 'react-router-dom';

const HomeView = () =>
{
    const navigate = useNavigate();
    const LogOutHandler = () => {
        ReactSession.set("email", '');
        ReactSession.set("name", '');
        ReactSession.set("surname", '');
        ReactSession.set("picture", '');
        ReactSession.set("isAuthenticated", false);
        navigate('/');
    }

    return <div className = "TemplateView">
        <button className="Button" onClick={LogOutHandler}>Log out</button>
    </div>
}

export default HomeView;