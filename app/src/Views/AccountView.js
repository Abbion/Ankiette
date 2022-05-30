import UserProfileComponent from "../Components/UserProfileComponent";
import Navbar from '../Components/Navbar'

const AccountView = () =>
{
    return <div className = "AccountView" style={{width: "100%", height: "auto"}}>
        <Navbar/>
        <div>
        <UserProfileComponent/>
        </div>
    </div>
}

export default AccountView