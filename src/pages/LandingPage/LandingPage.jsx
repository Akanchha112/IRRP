
import React from 'react';
// import Navbar from './Navbar'; Don't do this
import Navbar from '../../components/landingNavbar/Navbar';
import Header from '../../components/landingHeader/Header';
import Body from '../../components/landingBody/Body';
import Steps from '../../components/landingSteps/Steps';
import Footer from '../../components/landingFooter/Footer';



function LandingPage() {
    return (
      <div className="LandingPage">
        {/* LandingPage */}
        <Navbar />
        <Header/>
        <Body/>
        <Steps/>
        <Footer/>

      </div>
    );
  }
  
  export default LandingPage;