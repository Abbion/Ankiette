import '../Css/TemplateView.css'
import RegisterSuccessfulComponent from "../Components/RegisterSuccessfulComponent";

const RegisterSuccessfulView = () =>
{
    return <div className = "TemplateView">
        <div className = "LeftSide">
            <div className = "CatchPhrase">
                Tick your data in one place with Ankiette
            </div>
        </div>
        <div className = "RightSide">
            <RegisterSuccessfulComponent />
        </div>
    </div>
}

export default RegisterSuccessfulView;