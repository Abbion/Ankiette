import '../Css/LoginContent.css'
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
                <p className="LogoName">ANKIETTE</p>
                </div>
                <div className="LoginInput">
                    <p className="InputText">Email</p>
                    <input></input>
                    <p className="InputText">Password</p>
                    <input></input>
                </div>
                <div className="LogRegButtons">
                    <button>
                        Login
                    </button>
                    <button>
                        Register
                    </button>
                </div>
                <div className="RecoverButton">
                    <button>
                        Recover account
                    </button>
                </div>
            </div>
}

export default LoginContent