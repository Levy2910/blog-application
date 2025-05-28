import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">WriteYours</Link>
                <div className="navbar-links">
                    <Link to="/blog">Blogs</Link>
                    {!isLoggedIn && <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>}
                </div>
            </div>
            {isLoggedIn && (
                <div className="navbar-profile">
                    <FaUserCircle size={28} />
                    <span className="profile-name">Profile</span>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
