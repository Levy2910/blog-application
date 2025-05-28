// src/pages/RegisterPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [shortDescription, setshortDescription] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, name, shortDescription }),
            });

            const data = await response.json();
            if (response.status === 201) {
                let countdown = 5; // 5 seconds countdown
                setError(`${data.message}. You will be redirected in ${countdown} seconds.`);

                const interval = setInterval(() => {
                    countdown -= 1;
                    setError(`${data.message}. You will be redirected in ${countdown} seconds.`);

                    if (countdown === 0) {
                        clearInterval(interval);
                        navigate("/login");
                    }
                }, 1000);
            } else {
                setError(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please try again later.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h1>Create Your Account</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Short Description"
                        value={shortDescription}
                        onChange={(e) => setshortDescription(e.target.value)}
                        rows={3}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
