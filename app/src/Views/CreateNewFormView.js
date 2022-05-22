import '../Css/CreateForm.css'
import Navbar from '../Components/Navbar'
import AddQuestionComponent from '../Components/AddQuestionComponent'

const CreateFormView = () =>
{
    return <div className = "CreateFormView">
        <Navbar/>
        <AddQuestionComponent/>
    </div>
}

export default CreateFormView