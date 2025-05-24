package io.springApp.blog.controller;

import io.jsonwebtoken.io.IOException;
import io.springApp.blog.dto.BlogRequest;
import io.springApp.blog.model.Blog;
import io.springApp.blog.service.BlogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/blogs")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public List<Blog> getAllBlogs(){
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Blog>> getOneBlog(@PathVariable Long id) {
        Optional<Blog> blog = blogService.getOneBlog(id);
        if (blog.isPresent()) {
            return ResponseEntity.ok(blog);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping(value = "/{userId}", consumes = "multipart/form-data")
    public ResponseEntity<Blog> createBlog(
            @PathVariable UUID userId,
            @RequestPart("blog") BlogRequest blogRequest,
            @RequestPart("image") MultipartFile image
    ) {
        try {
            Blog created = blogService.createBlog(userId, blogRequest, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IOException | java.io.IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
