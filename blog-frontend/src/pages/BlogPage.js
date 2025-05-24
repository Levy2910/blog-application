import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get("http://localhost:8080/api/blogs", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);

                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError("Failed to fetch blogs. Please try again.");
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            {error && <p className="error">{error}</p>}
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPage;
