import '../Css/TemplateView.css'
import RegisterComponent from '../Components/RegisterComponent'


const RegisterView = () =>
{
    return <div className = "TemplateView">
            <div className = "LeftSide">
                <div className = "CatchPhrase">
                    Tick your data in one place with Ankiette
                </div>
            </div>
            <div className = "RightSide">
                <RegisterComponent />
            </div>
        </div>
}

export default RegisterView;