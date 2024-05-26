

import React from 'react';
import './Steps.css';
import ARROW from '../images/arrow.jpg';

function Steps() {
    return (
        <div className="steps-container">
            <h1>Register for ReWard in just <span className="green-text">4 Steps</span>:</h1>
            <div className="step">
                <div className="step-number">1</div>
                <p>Register</p>
                <img src={ARROW} alt="Arrow" className="arrow-image" />
            </div>
            <div className="step">
                <div className="step-number">2</div>
                <p>Fill the Form</p>
                <img src={ARROW} alt="Arrow" className="arrow-image" />
            </div>
            <div className="step">
                <div className="step-number">3</div>
                <p>Verify it</p>
                <img src={ARROW} alt="Arrow" className="arrow-image" />
            </div>
            <div className="step">
                <div className="step-number">4</div>
                <p>Submit it</p>
            </div>
        </div>
    );
}

export default Steps;

