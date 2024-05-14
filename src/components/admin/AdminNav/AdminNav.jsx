import React from 'react';
import '../../common/Navbar/Navbar.css';
import logo from '../../common/img/logo.png'
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../../services/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminNav(){
    const navigate=useNavigate();

    const profilehandle=()=>{
        navigate('/profile');
    }
    const homehandle=()=>{
        navigate('/institute');
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
                    <a href="#about" className="nav-link" onClick={()=>{profilehandle()}} >Profile</a>
                    <a href="#connect" className="nav-link" onClick={() => { logouthandle() }}>Logout</a>
                    {/* <a href="#connect" className="nav-link" onClick={()=>{homehandle()}}>Connect</a>
                    <a href="#contact" className="nav-link" onClick={()=>{homehandle()}}>Contact Us</a>
                    <a href="#" className="nav-link" onClick={()=>{loginhandle()}} >Login</a>
                    <a href="#" className="nav-link" onClick={()=>{signuphandle()}} >SignUp</a> */}
                </nav>
            </div>
        </div>
    )
}

export default AdminNav;