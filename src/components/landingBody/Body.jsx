import React from 'react';
import VC from '../images/vc.png';
import P1 from '../images/p1.jpg';
import P2 from '../images/p2.png';
import P3 from '../images/p3.png';
import P4 from '../images/p4.png';
import P5 from '../images/p5.png';
import S1 from '../images/s1.png';
import S2 from '../images/s2.png';
import S3 from '../images/s3.png';
import S4 from '../images/s4.png';
import S5 from '../images/s5.png';
import S6 from '../images/s6.png';
import './Body.css';

function Body() {
    return (
        // <div>This is body of the landing page</div>

        <div className="awardees-container">
            {/* Green line */}
            <div className="green-line"></div>
            {/* Body content */}
            <h1 className="heading" id='awardees'>AWARDEES</h1>
            <h2>Faculty</h2>

            <div className="awardee">
                <img src={VC} alt="vc" className="igdtuw" />
                <p>Dr. (Mrs.) Amita Dev</p>
            </div>
            <div className="awardee">
                <img src={P1} alt="P1" className="igdtuw" />
                <p>Dr. Ranu Gadi</p>
            </div>
            <div className="awardee">
                <img src={P2} alt="P2" className="igdtuw" />
                <p>Dr. Arun Sharma</p>
            </div>
            <div className="awardee">
                <img src={P3} alt="P3" className="igdtuw" />
                <p>Dr. Shalini Arora</p>
            </div>
            <div className="awardee">
                <img src={P4} alt="P4" className="igdtuw" />
                <p>Dr. AK Mohapatra</p>
            </div>
            <div className="awardee">
                <img src={P5} alt="P5" className="igdtuw" />
                <p>Dr. Nonita Sharma</p>
            </div>
            <h2>Students</h2>

            <div className="awardee">
                <img src={S1} alt="S1" className="igdtuw" />
                <p>Ms.Sitakshi Gupta</p>
            </div>
            <div className="awardee">
                <img src={S2} alt="S2" className="igdtuw" />
                <p>Ms.Ritu Goel</p>
            </div>
            <div className="awardee">
                <img src={S3} alt="S3" className="igdtuw" />
                <p>Ms.Deeba R. Naqvi</p>
            </div>
            <div className="awardee">
                <img src={S4} alt="S4" className="igdtuw" />
                <p>Ms.Ritu Chaudhari</p>
            </div>
            <div className="awardee">
                <img src={S5} alt="S5" className="igdtuw" />
                <p>Ms.Shobhna Shankar</p>
            </div>
            <div className="awardee">
                <img src={S6} alt="S6" className="igdtuw" />
                <p>Ms.Aakanksha Singh</p>
            </div>
        </div>
    );
}

export default Body;