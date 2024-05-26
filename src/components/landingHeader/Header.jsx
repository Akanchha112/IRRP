// Header.js
import React from 'react';
import './Header.css';
import IGDTUW from '../images/IGDTUW.jpeg';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const loginhandle = () => {
        navigate('/signin');
    }

    return (
        <header className="Header">
            <div className="header-content">
                <h1>
                    <span>Indira Gandhi Delhi</span>  <br />Technical <br /> <span className="greenText">University</span> for <br /> <span className="greenText">Women</span>
                </h1>
                <p>Established by Govt. of Delhi vide Act 9 of 2012<br />ISO 9001:2015 Certified University</p>
                <button className="login-button" onClick={loginhandle}>
                    Login
                </button>
            </div>
            <div className="igdtuw-container">
                <img src={IGDTUW} alt="IGDTUW" className="igdtuw" />
            </div>
        </header>
    );
}

export default Header;
