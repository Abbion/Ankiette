import '../Css/AccountView.css'
import UserProfileComponent from "../Components/UserProfileComponent";
import Navbar from '../Components/Navbar'

const AccountView = () =>
{
    return <div className = "AccountView">
        <Navbar/>
        <div>
        <UserProfileComponent/>
        </div>
    </div>
}

export default AccountView