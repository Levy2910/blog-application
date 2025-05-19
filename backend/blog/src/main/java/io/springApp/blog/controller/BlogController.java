package io.springApp.blog.controller;

import io.springApp.blog.model.Blog;
import io.springApp.blog.service.BlogService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/blogs")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("/display")
    public List<Blog> getAllBlogs(){
        return blogService.getAllBlogs();
    }

}
