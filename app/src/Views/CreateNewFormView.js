import '../Css/CreateForm.css'
import Navbar from '../Components/Navbar'
import AddQuestionComponent from '../Components/AddQuestionComponent'

import {useNavigate, useParams} from 'react-router-dom';

const CreateFormView = () =>
{
    let { formCode } = useParams();

    return <div className = "CreateFormView">
        <Navbar/>
        <AddQuestionComponent formCode={formCode}/>
    </div>
}

export default CreateFormView