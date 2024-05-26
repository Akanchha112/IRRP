import React from 'react';
import './Navbar.css'; // Import your CSS file
import logo from '../images/logo.png';
import logo2 from '../images/logo2.png';
function Navbar() {
    return (
        <div className="Navbar">
            <div className="logo"><img src={logo} alt="IRRP logo" className='logo' /></div>
            <nav className="navbar-items">
                <a href="https://research.igdtuw.ac.in/" target="_blank" rel="noopener noreferrer">Research</a>
                <a href="https://research.igdtuw.ac.in/" target="_blank" rel="noopener noreferrer">Awardees</a>
                <a href="https://research.igdtuw.ac.in/" target="_blank" rel="noopener noreferrer">Rewards</a>
            </nav>
            {/* <nav className="left"> */}
            {/* <button className="login-button">Login</button> */}
            <div className="logo2"><img src={logo2} alt="IGDTUW logo" className='logo2' /></div>
            {/* </nav> */}
            
            
            
        </div>
    );
}

export default Navbar;



