import '../Css/LoginContent.css'
import Button from '../Components/Button';
import Logo from '../Graphics/Logo/Logo';

const LoginContent = () =>
{
    function LoginClicked(){
        console.log("LogIn");
    }

    function RegisetClicked(){
        console.log("Register");
    }

    function RecoverAccountClicked(){
        console.log("Recover");
    }

    return  <div className="InputPanel">
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
                    <Button bgColor='#F2F2F2' color='#000A16' text='Login' onClick={LoginClicked}/>
                    <Button bgColor='#F2F2F2' color='#000A16' text='Register' onClick={RegisetClicked}/>
                </div>
                <div className="RecoverButton">
                    <Button bgColor='#F2F2F2' color='#000A16' text='Recover account' onClick={RecoverAccountClicked}/>
                </div>
            </div>
}

export default LoginContent