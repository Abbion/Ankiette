import Navbar from '../Components/Navbar'
import "../Css/NavbarView.css"
import PreLoginTemplateView from './PreLoginTemplateView'

const NavbarView = () =>
{
    return <div className="NavbarView">
        <div className="Navbar">
            <Navbar />
        </div>
        <div className="ContentView">
            <PreLoginTemplateView />
        </div>
    </div>
}

export default NavbarView