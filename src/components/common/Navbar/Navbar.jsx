import React from 'react';
import './Navbar.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Navbar(){
    const navigate=useNavigate();
    const loginhandle=()=>{
        navigate('/signin');
    }
    const signuphandle=()=>{
        navigate('/signup');
    }
    const homehandle=()=>{
        navigate('/');
    }
    return(
        <div id="navbar">
            <div className="Navbar-content-div">
                <a href="#home-sec" onClick={()=>{homehandle()}}>
                    <img
                        src={logo}
                        alt="ScholarSync Logo"
                        id="Navbar-img"
                    /></a> 
                <nav id="nav-bar">
                    <a href="#about" className="nav-link" onClick={()=>{homehandle()}}>About</a>
                    <a href="#connect" className="nav-link" onClick={()=>{homehandle()}}>Connect</a>
                    <a href="#contact" className="nav-link" onClick={()=>{homehandle()}}>Contact Us</a>
                    <a href="#" className="nav-link" onClick={()=>{loginhandle()}} >Login</a>
                    <a href="#" className="nav-link" onClick={()=>{signuphandle()}} >SignUp</a>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
