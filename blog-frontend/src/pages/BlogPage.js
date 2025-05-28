import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // import useNavigate
import "../styles/Blog.css";
import { AuthContext } from "../context/AuthContext";

const BlogPage = () => {
    const [randomBlogs, setRandomBlogs] = useState([]);
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);
    const [error, setError] = useState("");

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();  // get navigate function

    useEffect(() => {
        if (!isLoggedIn) {
            // Redirect user to login page if not logged in
            navigate("/login");
            return;
        }

        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const [randomRes, popularRes, allRes] = await Promise.all([
                    axios.get("http://localhost:8080/api/blogs/getRandomBlogs", config),
                    axios.get("http://localhost:8080/api/blogs/getMostPopularBlogs", config),
                    axios.get("http://localhost:8080/api/blogs", config),
                ]);

                setRandomBlogs(randomRes.data);
                setPopularBlogs(popularRes.data);
                setAllBlogs(allRes.data);
                setError("");
            } catch (err) {
                console.error("Blog loading error:", err);
                setError("Something went wrong while loading blogs.");
            }
        };

        fetchData();
    }, [isLoggedIn, navigate]);  // include navigate in deps

    // Preload images to help browser cache and avoid white space on fast scroll
    useEffect(() => {
        const preloadImages = (blogs) => {
            blogs.forEach((blog) => {
                const img = new Image();
                img.src = `http://localhost:8080/${blog.imagePath}`;
            });
        };

        if (randomBlogs.length) preloadImages(randomBlogs);
        if (popularBlogs.length) preloadImages(popularBlogs);
        if (allBlogs.length) preloadImages(allBlogs);
    }, [randomBlogs, popularBlogs, allBlogs]);

    const hookBlog = randomBlogs[0];
    const horizontalRandoms = randomBlogs.slice(1);

    return (
        <div className="blog-container">
            {error && <p className="error">{error}</p>}

            {/* 1. Random Horizontal */}
            <section className="section random-blogs-row">
                {horizontalRandoms.map((blog) => (
                    <div key={blog.id} className="blog-card small-card">
                        <img
                            src={`http://localhost:8080/${blog.imagePath}`}
                            alt={blog.title}
                            loading="lazy"
                            width={200}
                            height={120}
                            style={{ objectFit: "cover" }}
                        />
                        <h4>{blog.title}</h4>
                        <p>{blog.userName}</p>
                    </div>
                ))}
            </section>

            {/* 2. Hook Section */}
            {hookBlog && (
                <section className="section hook-blog">
                    <img
                        src={`http://localhost:8080/${hookBlog.imagePath}`}
                        alt={hookBlog.title}
                        loading="eager" // important image, load immediately
                        width={600}
                        height={350}
                        style={{ objectFit: "cover" }}
                    />
                    <div className="hook-content">
                        <h2>{hookBlog.title}</h2>
                        <p>{hookBlog.shortDescription}</p>
                        <p>By {hookBlog.userName}</p>
                    </div>
                </section>
            )}

            {/* 3. Popular Section */}
            <section className="section popular-blogs">
                <h3>Most Popular Blogs</h3>
                {popularBlogs.map((blog) => (
                    <div key={blog.id} className="blog-card popular-card">
                        <img
                            src={`http://localhost:8080/${blog.imagePath}`}
                            alt={blog.title}
                            loading="lazy"
                            width={200}
                            height={120}
                            style={{ objectFit: "cover" }}
                        />
                        <div>
                            <h5>{blog.title}</h5>
                            <p>{blog.views} views</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* 4. All Blogs (Scrollable) */}
            <section className="section scroll-blogs">
                <h3>All Blogs</h3>
                {allBlogs.map((blog) => (
                    <div key={blog.id} className="blog-card full-card">
                        <img
                            src={`http://localhost:8080/${blog.imagePath}`}
                            alt={blog.title}
                            loading="lazy"
                            width={300}
                            height={180}
                            style={{ objectFit: "cover" }}
                        />
                        <div>
                            <h4>{blog.title}</h4>
                            <p>{blog.shortDescription}</p>
                            <p>By {blog.userName}</p>
                            <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default BlogPage;
