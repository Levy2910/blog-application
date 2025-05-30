import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/SingleBlog.css";

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        const token = localStorage.getItem("token");

        const fetchBlog = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const res = await axios.get(`http://localhost:8080/api/blogs/${id}`, config);
                setBlog(res.data);
            } catch (err) {
                console.error("Error fetching blog:", err);
            }
        };

        fetchBlog();
    }, [id, isLoggedIn, navigate]);

    if (!blog) return <p>Loading blog...</p>;

    return (
        <div className="single-blog-container">
            <img
                src={`http://localhost:8080/${blog.imagePath}`}
                alt={blog.title}
                className="single-blog-image"
            />
            <h1 className="single-blog-title">{blog.title}</h1>
            <p className="single-blog-meta">
                By <strong>{blog.userName}</strong> &middot;{" "}
                {new Date(blog.createdAt).toLocaleDateString()} &middot;{" "}
                <span>{blog.views} views</span> &middot;{" "}
                <span className="blog-category">{blog.category}</span>
            </p>
            <p className="single-blog-description">{blog.shortDescription}</p>
            <div className="single-blog-content">{blog.content}</div>
            <div className="single-blog-user">
                <h3>About the Author</h3>
                <p>{blog.aboutUser}</p>
            </div>
        </div>
    );
};

export default SingleBlog;
