import React, { useState } from 'react';
import '../Css/Navbar.css'
import MenuBars from "../Graphics/Icons/MenuBars.png"
import MenuXmark from "../Graphics/Icons/MenuXmark.png"

import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const [clicked, setState] = useState(false);
    
    const createFormHandler = (e) => {
        e.preventDefault();
        navigate('/newForm');
    }

    const yourFormsHandler = (e) => {
        e.preventDefault();
        navigate('/home');
    }

    const reportsHandler = (e) => {
        e.preventDefault();
        navigate('/reports');
    }

    const accountHandler = (e) => {
        e.preventDefault();
        navigate('/account');
    }

    return(
        <div className = "NavbarBase">
            <nav className="NavbarItems">
                <ul className={clicked == true ? "NavMenuActive" : "NavMenu"}>
                    <button className="NavbarButton" onClick={yourFormsHandler}>
                        Your forms
                    </button>
                    <button className="NavbarButton" onClick={createFormHandler}>
                        Create new form
                    </button>
                    <button className="NavbarButton" onClick={reportsHandler}>
                        Reports
                    </button>
                    <button className="NavbarButton" onClick={accountHandler}>
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