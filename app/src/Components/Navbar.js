import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import '../Css/Navbar.css'
import MenuBars from "../Graphics/Icons/MenuBars.png"
import MenuXmark from "../Graphics/Icons/MenuXmark.png"

class Navbar extends Component {
    state = {clicked: false }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className="NavbarItems">
                <ul className={this.state.clicked ? "nav-menu-active" : "nav-menu"}>
                    {MenuItems.map((button, index) => React.cloneElement(button, {key: index}))}
                </ul>
                <div className="menu-icon" onClick={this.handleClick}>
                    <img src={this.state.clicked ? MenuXmark : MenuBars} 
                    alt={this.state.clicked ? "MenuXmark" : "MenuBars"} width={50}></img>
                </div>
            </nav>
        )
    }
}

export default Navbar