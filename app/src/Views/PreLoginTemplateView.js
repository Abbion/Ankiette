import '../Css/PreLoginTemplateView.css'
import LoginContent from './LoginContent'

const PreLoginTemplateView = () =>
{
    return <div className = "PreLoginTemplateView">
            <div className = "LeftSide">
                <div className = "CatchPhrase">
                    Tick your data in one place with Ankiette
                </div>
            </div>
            <div className = "RightSide">
                <LoginContent />
            </div>
        </div>
}

export default PreLoginTemplateView