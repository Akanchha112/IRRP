import React from 'react';
import './Footer.css';
import fb from '../images/fb.png';
import li from '../images/li.png';
import x from '../images/x.png';
import yt from '../images/yt.png';
import inst from '../images/inst.png';
import map from '../images/map.png';
import call from '../images/call.png';

function Footer() {
    return (
        <div className="footer-container">
            <div className="social-icons">
                <a href="https://www.facebook.com/Igdtu/" target="_blank" rel="noopener noreferrer">
                    <img src={fb} alt="Facebook" />
                </a>
                <a href="https://www.linkedin.com/company/igdtuw?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
                    <img src={li} alt="LinkedIn" />
                </a>
                <a href="https://x.com/IGDTUW_Delhi" target="_blank" rel="noopener noreferrer">
                    <img src={x} alt="Twitter" />
                </a>
                <a href="https://www.youtube.com/channel/UCKmYhevZ59gJJP0ZbpReBKA" target="_blank" rel="noopener noreferrer">
                    <img src={yt} alt="YouTube" />
                </a>
                <a href="https://www.instagram.com/igdtuw.official/" target="_blank" rel="noopener noreferrer">
                    <img src={inst} alt="Instagram" />
                </a>
                <img src={map} alt="Location" />
                <div className="address">
                    <p className="add">: Madrasa Road, Opposite St. James Church, Kashmere Gate, Delhi-110006</p>
                </div>
                <img src={call} alt="Phone" />
                <div className="contact-info">
                    <p className="phone-number">: 011-23900261, 23900264</p>
                </div>
            </div>
            <div className="credits">
                <p>Created by - 
                    <a href="https://www.linkedin.com/in/akanchha-singh-9138bb202/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">Akanchha</a>, 
                    <a href="https://www.linkedin.com/in/shweta-rawat-5b7097288/" target="_blank" rel="noopener noreferrer">Shweta</a> and
                    <a href="https://www.linkedin.com/in/tarni-balgoher-159879241/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">Tarni</a>
                </p>
            </div>
        </div>
    );
}

export default Footer;
