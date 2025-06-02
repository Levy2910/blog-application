import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/CreateBlog.css";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("TECH");
    const [image, setImage] = useState(null);

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please upload an image");
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

        const formData = new FormData();
        const blog = {
            title,
            shortDescription,
            content,
            category
        };

        // ✅ Correct: wrap the JSON string in a Blob (as an array of string)
        const blogBlob = new Blob([JSON.stringify(blog)], { type: "application/json" });

        // ✅ Append blog as JSON Blob
        formData.append("blog", blogBlob);

        // ✅ Append the image file
        formData.append("image", image);

        try {
            const res = await axios.post(`http://localhost:8080/api/blogs/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("Blog created:", res.data);
            navigate(`/singleBlog/${res.data.id}`);
        } catch (err) {
            console.error("Error creating blog:", err);
            alert("Failed to create blog.");
        }
    };

    return (
        <div className="create-blog-container">
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label>Short Description:</label>
                <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />

                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" required />

                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="TECH">Tech</option>
                    <option value="BUSINESS">Business</option>
                    <option value="LIFESTYLE">Lifestyle</option>
                    <option value="HEALTH">Health</option>
                </select>

                <label>Upload Image:</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />

                <button type="submit">Publish</button>
            </form>
        </div>
    );
};

export default CreateBlog;
