import React from 'react';
import "./MainDashboard.css";
import research from '../img/research.png';

function MainDashboard(){ return ( 
    <main>
            <section id="home-sec" className="flexible home-sec">
                <div className="eye-grabber-img">
                    <img src={research} alt="" />
                </div>
                <div className="eye-grabber">
                    <h1>Connect,Learn,Recruit in Academia.</h1>
                    <h2>
                    Revolutionizing Academic Collaboration and Recruitment

                    </h2>
                    
                </div>
            </section>
            <section id="about" className="sec-padding">
                <h3 className="section-heading">About</h3>
                <div className="sec-content-div flexible">
                    <p>
                    In today's fast-paced academic landscape, the need for efficient collaboration 
                    and streamlined recruitment processes is more pronounced than ever. 
                    Enter ScholarSync, a groundbreaking platform designed to bridge the gap
                     between researchers and professors, facilitating seamless connections and 
                     opportunities within the academic community.ScholarSync is a centralized hub 
                     where researchers can showcase their expertise, areas of interest, and 
                     qualifications through detailed profiles. By providing a comprehensive 
                     overview of their research background, scholars can attract the attention 
                     of professors seeking talented individuals for fellowships, research positions,
                     and collaborative projects.

                    </p>
                    
                </div>
            </section>
            
            <section id="connect" className="sec-padding">
                <h3 className="section-heading">Connect</h3>
                <div className="sec-content-div">
                    <div className="bars">
                        <div className="icon-container">
                            
                        </div>
                        <div className="txt-container">
                            <h5>Learn</h5>
                            <p>
                            Ignite your curiosity and deepen your knowledge

                            </p>
                        </div>
                    </div>
                    <div className="bars">
                        <div className="icon-container">
                            <img src="" alt="" />
                        </div>
                        <div className="txt-container">
                            <h5>Connect</h5>
                            <p>Join a vibrant community of researchers and professors
                            
                            </p>
                        </div>
                    </div>
                    <div className="bars">
                        <div className="icon-container">
                            <img src="" alt="" />
                        </div>
                        <div className="txt-container">
                            <h5>Grow</h5>
                            <p>
                            Take the next step in your academic journey
                            </p>
                        </div>
                    </div>
                </div>
            </section>
           
            <section className="sec-padding" id="contact">
                <h3 className="section-heading">Contact Us</h3>
                <div className="sec-content-div flexible">
                
                    <form
                        id="form"
                        action=""
                        method="POST"
                    > 
                        <input className='contactForm'
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            required
                        /><br />
                        <input type="email" name="email" className='contactForm' placeholder='Enter your email' id='' required/>
                        <br />
                        <textarea type="text" name="message" className='contactForm' placeholder='Enter your message' id='' required />
                        <br /> 
                        <input type="submit" className="btn" id="submit" value="Send" />
                    </form>
                </div>
            </section>
        </main>
)}

export default MainDashboard;
    