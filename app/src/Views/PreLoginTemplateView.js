import '../Css/TemplateView.css'
import LoginComponent from '../Components/LoginComponent'
import RegisterComponent from '../Components/RegisterComponent'
import AccountRecoveryComponent from '../Components/AccountRecoveryComponent'
import RegisterSuccessfulComponent from '../Components/RegisterSuccessfulComponent'


const PreLoginTemplateView = () =>
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

export default PreLoginTemplateView;