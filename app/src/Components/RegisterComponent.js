import '../Css/BasicComponents.css'
import '../Css/RegisterComponent.css'
import Logo from '../Graphics/Logo/Logo';

const RegisterComponent = () =>
{
    function RegisterClicked(){
        console.log("Register");
    }

    return  <div className="RegisterInputPanel">
                <div className="Logo">
                    <Logo />
                    <p className="LogoName">ANKIETTE</p>
                </div>
                <div className="TabName">
                    <h1>Registration</h1>
                </div>
                <div className="RegisterInputs">
                    <label className="InputLabel">Email</label>
                    <input className="Input"/>
                    <label className="InputLabel">Name</label>
                    <input className="Input"/>
                    <label className="InputLabel">Surname</label>
                    <input className="Input"/>
                    <label className="InputLabel">Password</label>
                    <input className="Input" type="password"/>
                    <label className="InputLabel">Repeat password</label>
                    <input className="Input" type="password"/>
                </div>
                <div className="RegisterButton">
                    <button className="Button">
                        Register
                    </button>
                </div>
            </div>
}

export default RegisterComponent