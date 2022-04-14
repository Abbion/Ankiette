import '../Css/LoginView.css'
import Button from '../Components/Button';
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
                        <Logo />
                        <p3 className="LogoName">ANKIETTE</p3>
                    </div>
                    <div className="LoginInput">
                        <p5 className="InputText">Email</p5>
                        <input className="Input"></input>
                        <p5 className="InputText">Password</p5>
                        <input className="Input"></input>
                    </div>
                    <div className="LogRegButtons">
                        <Button bgColor='#F2F2F2' color='#000A16' text='Login'/>
                        <Button bgColor='#F2F2F2' color='#000A16' text='Register'/>
                    </div>
                    <div className="RecoverButton">
                        <Button bgColor='#F2F2F2' color='#000A16' text='Recover account'/>
                    </div>
                </div>
            </div>
        </div>
}

export default LoginView