import React from 'react';

import logo from '../../common/img/logo.png'
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../../services/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function StuNav(){
    const navigate=useNavigate();

    const profilehandle=()=>{
        navigate('/profile');
    }
    const homehandle=()=>{
        navigate('/student');
    }
    const appliedhandle=()=>{
        navigate('/Applied');
    }
    const logouthandle = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.clear();
            navigate("/");
            console.log("Signed out successfully")
            toast.success("Signed out Successfully", { position: "top-center" });
        }).catch((error) => {
            // An error happened.
            console.error(error);
            toast.success(error.msg, { position: "bottom-center" });
        });
    }
    return(
        <div id="navbar">
            <div className="Navbar-content-div" style={{"marginRight":"80px","marginLeft":"80px"}}>
                <a href="#home-sec" onClick={()=>{homehandle()}}>
                    <img
                        src={logo}
                        alt="ScholarSync Logo"
                        id="Navbar-img"
                    /></a> 
                <nav id="nav-bar">
                    <a href="#" className="nav-link" onClick={()=>{appliedhandle()}}>Applied</a>
                    <a href="#about" className="nav-link" onClick={()=>{profilehandle()}} >Profile</a>
                    <a href="#" className="nav-link" onClick={() => { logouthandle() }}>Logout</a>
                
                </nav>
            </div>
        </div>
    )
}

export default StuNav;