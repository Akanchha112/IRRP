import React from 'react';
import  "./index.css";
import logo from '../../common/img/logo.png'
import { signOut } from "firebase/auth";
import { auth } from '../../../services/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
// import logo from '../../../common/img/logo.png';
import { useNavigate } from 'react-router-dom';

function ProfNav() {
    const [click, setClick] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const profilehandle = () => {
        navigate('/profile');
    }
    const homehandle = () => {
        navigate('/faculty');
    }
    const appliedhandle = () => {
        navigate('/applied');
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

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div id="navbar">
            <div className="Navbar_container" >
                <a href="#home-sec" onClick={() => { homehandle() }}>
                    <img
                        src={logo}
                        alt="ScholarSync Logo"
                        id="Navbar-img"
                    /></a>
                <div className="nav-icon" onClick={handleClick}>
                    <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
                </div>
                <nav id="nav-bar">
                    <a href="#about" className="nav-link" onClick={() => { profilehandle() }} >Profile</a>
                    <a href="#" className="nav-link" onClick={() => { logouthandle() }}>Logout</a>
                    <a href="#" className="nav-link" onClick={() => { appliedhandle() }}>Applied</a>
                    {/* <a href="#contact" className="nav-link" onClick={()=>{homehandle()}}>Contact Us</a>
                    <a href="#" className="nav-link" onClick={()=>{loginhandle()}} >Login</a>
                    <a href="#" className="nav-link" onClick={()=>{signuphandle()}} >SignUp</a> */}
                </nav>
            </div>
        </div>
    )
}

export default ProfNav;