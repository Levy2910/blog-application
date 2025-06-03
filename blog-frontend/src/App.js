// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar'; // <- Import Navbar
import SingleBlog from './pages/SingleBlog';
import CreateBlog from './pages/CreateBlog';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar /> {/* <- Always visible on all routes */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/singleBlog/:id" element={<SingleBlog />} />
          <Route path="/createBlog" element={<CreateBlog />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
