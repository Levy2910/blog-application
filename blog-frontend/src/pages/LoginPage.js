import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming you export useAuth
import "../styles/Login.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Login failed.");
                setLoading(false);
                return;
            }

            const { token, user } = await response.json();
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setIsLoggedIn(true); // This will trigger the decoding and role management in AuthContext

            // Let AuthContext handle decoding, but navigate based on decoded role
            const { role } = JSON.parse(atob(token.split(".")[1]));
            navigate(role === "ADMIN" ? "/admin/dashboard" : "/blogs");
        } catch (err) {
            setError("Network error. Please try again later.");
        } finally {
            setLoading(false);
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
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
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
