import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Import your custom hook
import "../styles/Home.css";

const HomePage = () => {
    const { isLoggedIn } = useAuth();

    // Get role from token if logged in
    const getRoleFromToken = () => {
        if (!isLoggedIn) return null;

        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.role;
        } catch (e) {
            return null;
        }
    };

    const role = getRoleFromToken();

    return (
        <div className="home-page">
            <img
                src="/jess-bailey-q10VITrVYUM-unsplash.jpg"
                alt="Blog Background"
                className="home-image"
            />
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
                    <Link to={role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
                        Go to Dashboard
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HomePage;
