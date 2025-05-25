package io.springApp.blog.service;

import io.springApp.blog.dto.BlogRequest;
import io.springApp.blog.dto.BlogResponse;
import io.springApp.blog.model.Blog;
import io.springApp.blog.model.User;
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

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public BlogResponse getOneBlog(Long id) {
        Blog currBlog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));

        BlogResponse response = new BlogResponse();
        response.setId(currBlog.getId());
        response.setTitle(currBlog.getTitle());
        response.setContent(currBlog.getContent());
        response.setImagePath(currBlog.getImagePath());
        response.setCreatedAt(currBlog.getCreatedAt());
        response.setUpdatedAt(currBlog.getUpdatedAt());

        return response;
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
}
