import React from 'react';
import './ThankYouPage.css';


const ThankYouPage = () => {
    return (
        
        <div className="thank-you-container">
            <div className="thank-you-content">
            <img src="/images/Logo.jpg" alt="Logo" class="thank-you-logo"/>
                <h2 className="thank-you-title">Thank You for Participating!</h2>
                <p className="thank-you-message">
                    We appreciate your time and effort. Your responses have been recorded successfully.
                </p>
                <button 
                    className="home-button"
                    onClick={() => window.location.href = '/'}
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default ThankYouPage;
