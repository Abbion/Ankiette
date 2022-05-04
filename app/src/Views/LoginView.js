import '../Css/TemplateView.css'
import LoginComponent from '../Components/LoginComponent'


const LoginView = () =>
{
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