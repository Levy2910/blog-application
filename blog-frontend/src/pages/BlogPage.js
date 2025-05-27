import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Blog.css";

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
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError("Failed to fetch blogs. Please try again.");
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="blog-page">
            <h1>Blog Posts</h1>
            {error && <p className="error">{error}</p>}
            <ul className="blog-list">
                {blogs.map((blog) => (
                    <li key={blog.id} className="blog-item">
                        <h2>{blog.title}</h2>
                        <p><strong>Category:</strong> {blog.category}</p>
                        <p><strong>Author:</strong> {blog.userName}</p>
                        {blog.aboutUser && <p><strong>About Author:</strong> {blog.aboutUser}</p>}
                        <p><strong>Views:</strong> {blog.views}</p>
                        <p><strong>Description:</strong> {blog.shortDescription}</p>
                        <p><strong>Content:</strong></p>
                        <p>{blog.content}</p>

                        {blog.imagePath && (
                            <img
                                src={`http://localhost:8080/${blog.imagePath}`}
                                alt={blog.title}
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        )}

                        <div className="blog-dates">
                            <p><strong>Created:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
                            <p><strong>Updated:</strong> {new Date(blog.updatedAt).toLocaleString()}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </div>

    );
};

export default BlogPage;
