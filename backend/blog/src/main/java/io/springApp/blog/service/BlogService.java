package io.springApp.blog.service;

import io.springApp.blog.dto.BlogRequest;
import io.springApp.blog.dto.BlogResponse;
import io.springApp.blog.model.Blog;
import io.springApp.blog.model.User;
import io.springApp.blog.model.enums.BlogCategory;
import io.springApp.blog.repository.BlogRepository;
import io.springApp.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BlogService {

    @Value("${blog.upload.dir}")
    private String uploadDir;

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public BlogService(BlogRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    public List<BlogResponse> getAllBlogs() {
        List<Blog> listOfBlogs = blogRepository.findAll();
        List<BlogResponse> responses = new ArrayList<>();
        for (Blog blog : listOfBlogs){
            BlogResponse response = mapToResponse(blog);
            responses.add(response);
        }
        return responses;
    }

    public BlogResponse getOneBlog(Long id) {
        Blog currBlog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));
        return mapToResponse(currBlog);
    }


    public Blog createBlog(UUID userId, BlogRequest blogRequest, MultipartFile imageFile) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Blog blog = new Blog();
        blog.setTitle(blogRequest.getTitle());
        blog.setContent(blogRequest.getContent());
        blog.setUser(user);
        blog.setShortDescription(blogRequest.getShortDescription());
        blog.setCategory(blogRequest.getCategory());

        // Ensure uploadDir is valid and not empty
        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath); // Create directory if it doesn't exist

        String filename = UUID.randomUUID() + "-" + imageFile.getOriginalFilename();
        Path targetPath = uploadPath.resolve(filename);
        Files.copy(imageFile.getInputStream(), targetPath);

        blog.setImagePath("images/" + filename);

        return blogRepository.save(blog);
    }

    public List<BlogResponse> getMostPopularBlogs() {
        List<Blog> popularBlogs = blogRepository.findTop5ByOrderByViewsDesc();
        return popularBlogs.stream()
                .map(this::mapToResponse)
                .toList();
    }
    private BlogResponse mapToResponse(Blog blog) {
        BlogResponse response = new BlogResponse();
        response.setId(blog.getId());
        response.setTitle(blog.getTitle());
        response.setShortDescription(blog.getShortDescription());
        response.setContent(blog.getContent());
        response.setCategory(blog.getCategory());
        response.setImagePath(blog.getImagePath());
        response.setCreatedAt(blog.getCreatedAt());
        response.setUpdatedAt(blog.getUpdatedAt());
        response.setViews(blog.getViews());

        // user
        User user = blog.getUser();
        response.setUserName(user.getUsername());
        response.setAboutUser(user.getAboutUser());
        return response;
    }


    public List<BlogResponse> getRandomBlogs() {
        List<Blog> randomBlogs = blogRepository.findRandomBlogs();
        return randomBlogs.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<BlogResponse> getBlogsByCategory(BlogCategory blogCategory) {
        List<Blog> blogs = blogRepository.findByCategory(blogCategory);
        return blogs.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<BlogResponse> getBlogsByUserId(UUID userId) {
       List<Blog> blogs =  blogRepository.findByUserId(userId);
                return blogs.stream().map(this::mapToResponse).toList();
    }
}
