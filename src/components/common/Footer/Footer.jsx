import React from 'react';
import './Footer.css';
import logo from '../../common/img/IGDTUWlogo.jpg';
function Footer(){
    return(
        <footer>
            <div className='main-div'> 
                {/* <div className='contactIcons'>
                <img src="" alt-text="email"/>
                <img src="" alt-text="" />
                <img src="" alt-text="" />
                </div> */}
                
                <div className='footer' id=''>
                <img src={logo} className='' id=''></img>
                </div>
            </div>

            
        </footer>
    )
}
export default Footer;