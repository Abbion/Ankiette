import React, { useState } from 'react';
import '../Css/Navbar.css'
import MenuBars from "../Graphics/Icons/MenuBars.png"
import MenuXmark from "../Graphics/Icons/MenuXmark.png"

const Navbar = () => {
    const [clicked, setState] = useState(false);

    return(
        <div className = "NavbarBase">
            <nav className="NavbarItems">
                <ul className={clicked == true ? "NavMenuActive" : "NavMenu"}>
                    <button className="NavbarButton">
                        Your forms
                    </button>
                    <button className="NavbarButton">
                        Create new form
                    </button>
                    <button className="NavbarButton">
                        Reports
                    </button>
                    <button className="NavbarButton">
                        Account
                    </button>
                    <button className="LogoutButton">
                        Logout
                    </button>
                </ul>
                <div className="MenuIcon" onClick={() => setState(!clicked)}>
                    <img src={clicked == true ? MenuXmark : MenuBars} width={50}></img>
                </div>
            </nav>
        </div>
    )
}

export default Navbar