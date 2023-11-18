// Contact.js
import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add your logic for handling the form submission here

        console.log('Form submitted:', formData);
        // Reset the form after submission
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>

                <button type="submit">Submit</button>
            </form>

            <div className="reach-out-container">
                <h2>Reach Out</h2>
                <p>Contact us:</p>
                <p>Instagram: gothrone01</p>
                <p>Email: gothrone01@gmail.com</p>
            </div>

            <div className="legal-stuff-container">
                <h2>Legal Stuff</h2>
                <p>Terms & conditions</p>
                <p>Privacy and cookies</p>
            </div>

            <div className="terms-conditions-container">
                <h3>Terms & Conditions</h3>
                <p>Updated: November 15th 2023.</p>
                <p>
                    These Terms of Service govern your use of the website located at
                    https://www.gothrone.com and any related services provided by Gothrone.
                </p>
                <p>
                    By accessing https://www.gothrone.com, you agree to abide by these Terms of
                    Service and to comply with all applicable laws and regulations. If you do not
                    agree with these Terms of Service, you are prohibited from using or accessing
                    this website or using any other services provided by Gothrone.
                </p>
                <p>
                    We, gothrone, reserve the right to review and amend any of these Terms of
                    Service at our sole discretion. Upon doing so, we will update this page. Any
                    changes to these Terms of Service will take effect immediately from the date
                    of publication.
                </p>
                <p>These Terms of Service were last updated on 15 November 2023.</p>
            </div>
        </div>
    );
};

export default Contact;
