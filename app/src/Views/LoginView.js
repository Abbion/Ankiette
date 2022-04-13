import '../Css/LoginView.css'
import Logo from './../Graphics/Logo/Logo';

const LoginView = () =>
{
    return <div className = "LoginView">
            <div className = "LeftSide">
                <div className = "CatchPhrase">
                    Tick your data in one place with Ankiette
                </div>
            </div>
            <div className = "RightSide">
                <div className="InputPanel">
                    <div className="Logo">
                        <Logo/>
                    </div>
                    <div className="LoginInput">

                    </div>
                    <div className="LogRegButtons">

                    </div>
                    <div className="RecoverButton">

                    </div>
                </div>
            </div>
        </div>
}

export default LoginView