import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // stores decoded token
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                logout();
            } else {
                setUser(decoded);
                setIsLoggedIn(true);

                const timeout = setTimeout(() => {
                    logout();
                }, decoded.exp * 1000 - Date.now());

                return () => clearTimeout(timeout);
            }
        } catch (e) {
            logout();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);