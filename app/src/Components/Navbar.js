import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import '../Css/Navbar.css'

class Navbar extends Component {
    render() {
        return(
            <nav className="NavbarItems">
                <ul className="nav-menu">
                    {MenuItems.map((button, index) => React.cloneElement(button, {key: index}))}
                </ul>
            </nav>
        )
    }
}

export default Navbar