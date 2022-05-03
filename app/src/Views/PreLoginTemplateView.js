import '../Css/PreLoginTemplateView.css'
import LoginComponent from '../Components/LoginComponent'

import RegisterComponent from '../Components/RegisterComponent'
import RegisterSuccessfulComponent from '../Components/RegisterSuccessfulComponent'
import AccountRecoveryComponent from '../Components/AccountRecoveryComponent'

const PreLoginTemplateView = () =>
{
    return <div className = "PreLoginTemplateView">
            <div className = "LeftSide">
                <div className = "CatchPhrase">
                    Tick your data in one place with Ankiette
                </div>
            </div>
            <div className = "RightSide">
                <LoginComponent />
                {/* <RegisterComponent/> */}
               
            </div>
        </div>
}

export default PreLoginTemplateView