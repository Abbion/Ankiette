import '../Css/BasicComponents.css'
import '../Css/LoginComponent.css'
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

    return  <div className="LoginInputPanel">
                <div className="Logo">
                    <Logo />
                    <p className="LogoName">ANKIETTE</p>
                </div>
                <div className="LoginInputs">
                    <label className="InputLabel">Email</label>
                    <input className="Input" />
                    <label className="InputLabel">Password</label>
                    <input className="Input" type="password" />
                </div>
                <div className="LogRegButtons">
                    <button className="Button">
                        Login
                    </button>
                    <button className="Button">
                        Register
                    </button>
                </div>
                <div className="RecoverButton">
                    <button className="Button">
                        Recover account
                    </button>
                </div>
            </div>
}

export default LoginContent