import React from 'react';
import './Navbar.css'; // Import your CSS file
import logo from '../images/logo.png';
import logo2 from '../images/logo2.png';
import { Navigate, useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate=useNavigate();
    const homehandle=()=>{
        navigate('/');
    }
    return (
        <div className="Navbar">
            <div className="logo">
               <a href='' onClick={()=>{homehandle()}}>
                <img src={logo} alt="IRRP logo" className='logo' /></a></div>
            <nav className="navbar-items">
                <a href="https://research.igdtuw.ac.in/" target="_blank" rel="noopener noreferrer">Research</a>
                <a href="#awardees" target="" rel="" onClick={()=>{homehandle()}}>Awardees</a>
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



