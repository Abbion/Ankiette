import Navbar from '../Components/Navbar'
import "../Css/NavbarView.css"
import LoginView from './LoginView'

const NavbarView = () =>
{
    return <div className="NavbarView">
        <div className="Navbar">
            <Navbar />
        </div>
        <div className="ContentView">
            <LoginView />
        </div>
    </div>
}

export default NavbarView