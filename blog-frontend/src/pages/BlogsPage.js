import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Blog.css";
import { AuthContext } from "../context/AuthContext";

const BlogsPage = () => {
    const [userBlogs, setUserBlogs] = useState([]);
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [hookBlog, setHookBlog] = useState(null);
    const [error, setError] = useState("");

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user?.id) {
            alert("User not found in localStorage.");
            return;
        }

        const userId = user.id;

        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const [userRes, popularRes, hookRes] = await Promise.all([
                    axios.get(`http://localhost:8080/api/blogs/getBlogByUser/${userId}`, config),
                    axios.get("http://localhost:8080/api/blogs/getMostPopularBlogs", config),
                    axios.get("http://localhost:8080/api/blogs/getRandomBlogs", config),
                ]);

                setUserBlogs(userRes.data);
                setPopularBlogs(popularRes.data);
                setHookBlog(hookRes.data[0] || null);
                setError("");
            } catch (err) {
                console.error("Blog loading error:", err);
                setError("Something went wrong while loading blogs.");
            }
        };

        fetchData();
    }, [isLoggedIn, navigate]);

    const handleBlogClick = (blogId) => {
        navigate(`/singleBlog/${blogId}`);
    };

    return (
        <div className="blog-container">
            {error && <p className="error">{error}</p>}

            <section className="section user-blogs">
                <h3>Your Blogs</h3>
                <p className="section-intro">These are blogs you've written. Keep your readers engaged—share something new!</p>

                {userBlogs.length > 0 ? (
                    <div className="blogs-row">
                        {userBlogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="blog-card small-card"
                                onClick={() => handleBlogClick(blog.id)}
                            >
                                <img src={`http://localhost:8080/${blog.imagePath}`} alt={blog.title} />
                                <h4>{blog.title}</h4>
                                <p>{blog.userName}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-blogs">
                        <p>You haven't written any blogs yet.</p>
                    </div>
                )}

                <div className="create-blog-wrapper">
                    <button className="create-blog-btn" onClick={() => navigate("/createBlog")}>
                        + Write a New Blog
                    </button>
                </div>
            </section>

            {hookBlog && (
                <section className="section hook-blog" onClick={() => handleBlogClick(hookBlog.id)}>
                    <p className="section-intro">Featured blog picked just for you!</p>
                    <img src={`http://localhost:8080/${hookBlog.imagePath}`} alt={hookBlog.title} />
                    <div className="hook-content">
                        <h2>{hookBlog.title}</h2>
                        <p>{hookBlog.shortDescription}</p>
                        <p>By {hookBlog.userName}</p>
                    </div>
                </section>
            )}

            <section className="section popular-blogs">
                <h3>Most Popular Blogs</h3>
                <p className="section-intro">Check out what others are reading the most.</p>
                <div className="blog-row">
                    {popularBlogs.map((blog) => (
                        <div key={blog.id} className="blog-card popular-card" onClick={() => handleBlogClick(blog.id)}>
                            <img src={`http://localhost:8080/${blog.imagePath}`} alt={blog.title} />
                            <div>
                                <h5>{blog.title}</h5>
                                <p>{blog.views} views</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
};

export default BlogsPage;
