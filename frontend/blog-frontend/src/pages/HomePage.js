import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Blog</h1>
            <p>Check out our latest posts!</p>
            <Link to="/blog">Go to Blog</Link>
        </div>
    );
};

export default HomePage;
