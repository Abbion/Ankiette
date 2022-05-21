import '../Css/RegisterSuccessfulComponent.css'
import '../Css/BasicComponents.css'
import Logo from '../Graphics/Logo/Logo'
import CircleGreenTick from '../Graphics/Icons/CircleGreenTick'

const RegisterSuccessfulComponent = () => {
    function LoginNowClicked() {
        console.log("LogIn Now");
    }

    return <div className="RegisterSuccessfulPanel">
        <div className="Logo">
            <Logo />
            <p className="LogoName">ANKIETTE</p>
        </div>
        <div className="TabName">
            <h1>Registration</h1>
        </div>
        <div className="SuccessText">
            <h1>Your account has been successfuly created.</h1>
        </div>
        <CircleGreenTick />
        <div className="LoginNowButton">
            <button className="Button">
                Login now
            </button>
        </div>
    </div>
}

export default RegisterSuccessfulComponent