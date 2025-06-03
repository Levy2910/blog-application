import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h4>About WriteYours</h4>
                    <p>Your go-to place to share ideas, discover inspiring content, and connect with writers worldwide.</p>
                </div>

                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/createBlog">Create Blog</Link></li>
                        <li><Link to="/profile">My Profile</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h4>Contact</h4>
                    <p>Email: support@writeyours.com</p>
                    <p>Melbourne, VIC, Australia</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} WriteYours. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
