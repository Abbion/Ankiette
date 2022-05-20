import '../Css/CreateForm.css'
import Navbar from '../Components/Navbar'
import AddQuestionComponent from '../Components/AddQuestionComponent'

const CreateForm = () =>
{
    return <div className = "CreateForm">
        <Navbar/>
        <AddQuestionComponent/>
    </div>
}

export default CreateForm