package io.springApp.blog.controller;

import io.jsonwebtoken.io.IOException;
import io.springApp.blog.dto.BlogRequest;
import io.springApp.blog.dto.BlogResponse;
import io.springApp.blog.model.Blog;
import io.springApp.blog.model.enums.BlogCategory;
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
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable Long id) {
        BlogResponse response = blogService.getOneBlog(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getMostPopularBlogs")
    public ResponseEntity<List<BlogResponse>> getMostPopularBlog() {
        List<BlogResponse> listOfBlogs = blogService.getMostPopularBlogs();
        return ResponseEntity.ok(listOfBlogs);
    }

    @GetMapping("/getRandomBlogs")
    public ResponseEntity<List<BlogResponse>> getRandomBlogs(){
        List<BlogResponse> listOfBlogs = blogService.getRandomBlogs();
        return ResponseEntity.ok(listOfBlogs);
    }

    @GetMapping("/category/{blogCategory}")
    public ResponseEntity<List<BlogResponse>> getBlogsByCategory(@PathVariable String blogCategory) {
        BlogCategory category;
        try {
            category = BlogCategory.valueOf(blogCategory.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        List<BlogResponse> listOfBlogs = blogService.getBlogsByCategory(category);
        return ResponseEntity.ok(listOfBlogs);
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
