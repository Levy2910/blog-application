import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/SingleBlog.css";

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
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
                const res = await axios.get(`http://localhost:8080/api/blogs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBlog(res.data);
            } catch (err) {
                console.error("Error fetching blog:", err);
            }
        };

        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/comments/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setComments(res.data);
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        };

        fetchBlog();
        fetchComments();
    }, [id, isLoggedIn, navigate]);

    if (!blog) return <p>Loading blog...</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user || !user.username) {
            alert("User not found or not logged in.");
            return;
        }

        const commentData = {
            content: content,
            userName: user.username
        };
        console.log(user.username);

        try {
            const res = await axios.post(`http://localhost:8080/api/comments/${id}`, commentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Comment created:", res.data);
            setComments(prev => [...prev, res.data]); // update local state
            setContent(""); // clear input field
        } catch (err) {
            console.error("Error creating comment:", err);
            alert("Failed to create comment.");
        }
    };

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
            <div className="comments">
                <h3>Comments</h3>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.commentID} className="comment">
                            <div className="comment-header">
                                <img src={`http://localhost:8080/${comment.userProfileImage}`} alt="profile" className="comment-avatar" />
                                <strong>{comment.userName}</strong>
                                <span className="comment-time">{comment.createdAt}</span>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    ))
                )}

                <form onSubmit={handleSubmit}>
                    <label>Add a comment</label>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default SingleBlog;
