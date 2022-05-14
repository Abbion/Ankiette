import '../Css/CreateForm.css'
import Navbar from '../Components/Navbar'

const CreateForm = () =>
{
    return <div className = "CreateForm">
        <Navbar/>
        <div className="AddAndConfigm">
            <button>
                <h1>Add question</h1>
            </button>

            <h1>
                Confirm and create new form - Your form will be saved and You will be able to share it.
            </h1>
            <button>
                Confirm
            </button>
        </div>
    </div>
}

export default CreateForm