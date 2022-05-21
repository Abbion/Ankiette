import '../Css/AccountRecoveryComponent.css'
import '../Css/BasicComponents.css'
import Logo from '../Graphics/Logo/Logo'

const AccountRecoveryComponent = () => {
    function SendCodeClicked() {
        console.log("Send code");
    }

    function RecoverAccountClicked() {
        console.log("Recover account")
    }

    return <div className="AccountRecoveryPanel">
        <div className="Logo">
            <Logo />
            <p className="LogoName">ANKIETTE</p>
        </div>
        <div className="TabName">
            <h1>Recover account</h1>
        </div>
        <div className="RecoveryInstruction">
            <h1>To recover your account, provide your email and enter an 8 digit code that was sent to you via email.</h1>
        </div>
        <div className="InputField">
            <label className="InputLabel">Email</label>
            <input className="Input"/>
        </div>
        <button className="Button">Send code</button>
        <div className="InputField">
            <label className="InputLabel">8 digit code</label>
            <input className="Input"/>
        </div>
        <button className="Button">Recover account</button>
    </div>
}

export default AccountRecoveryComponent