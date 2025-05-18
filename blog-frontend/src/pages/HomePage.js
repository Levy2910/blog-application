import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// Utility function to decode token and get role (simple base64 decode of payload)
const getRoleFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role; // Assuming your JWT has a "role" field
    } catch (e) {
        return null;
    }
};

const HomePage = () => {
    const role = getRoleFromToken();
    console.log(role);
    return (
        <div className="home-page">
            <img src="/jess-bailey-q10VITrVYUM-unsplash.jpg" alt="Blog Background" className="home-image" />
            <h1>Welcome to the Blog</h1>
            <p>Check out our latest posts!</p>
            <Link to="/blog">Go to Blog</Link>
            <div className="auth-links">
                {!role ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <Link to={role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}>
                        Go to Dashboard
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HomePage;
