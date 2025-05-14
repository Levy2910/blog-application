import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch blogs from the backend API
        axios.get('http://localhost:8080/api/blogs')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPage;
