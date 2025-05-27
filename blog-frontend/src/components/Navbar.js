// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">MyBlog</Link>
                <div className="navbar-links">
                    <Link to="/blog">Blogs</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </div>
            <div className="navbar-profile">
                <FaUserCircle size={28} />
                <span className="profile-name">Profile</span>
            </div>
        </nav>
    );
};

export default Navbar;
