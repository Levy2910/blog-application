// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText || "Login failed. Please try again.");
                return;
            }

            // Since the token is returned as plain text
            const authResponse = await response.json();
            const token = authResponse.token;
            const user = authResponse.user;
            // Save token to localStorage
            localStorage.setItem("token", token);
            // Optionally save user info too
            localStorage.setItem("user", JSON.stringify(user));

            // Extract role from JWT token
            const role = JSON.parse(atob(token.split('.')[1])).role;
            navigate(role === "ADMIN" ? "/admin/dashboard" : "/blog");
        } catch (err) {
            setError("Network error. Please try again later.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login to Your Account</h1>
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
