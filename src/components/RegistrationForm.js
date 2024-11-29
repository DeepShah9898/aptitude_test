import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; // Custom CSS file for styling

const RegistrationForm = ({ onRegister }) => {
    const [formData, setFormData] = useState({ name: '', email: '', number: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setError(''); // Clear any previous error
            await axios.post('http://localhost:5000/register', formData);
            onRegister(formData.email);
        } catch (error) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <img src="/images/Logo.jpg" alt="Infobloom Tech Solution Logo" className="logo" />
            <h2>Join the Aptitude Challenge</h2>
            <p>Register now to test your skills and shine!</p>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Phone Number</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        placeholder="Enter your phone number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Submitting...' : 'Register Now'}
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
