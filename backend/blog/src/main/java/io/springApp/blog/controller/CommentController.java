package io.springApp.blog.controller;

import io.springApp.blog.dto.CommentRequest;
import io.springApp.blog.dto.CommentResponse;
import io.springApp.blog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {
    private CommentService commentService;

    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping("/{blogId}/comments")
    public ResponseEntity<List<CommentResponse>> getAllCommentsForABlog(@PathVariable Long blogId) {
        List<CommentResponse> comments = commentService.getCommentsByBlogId(blogId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("{blogId}/comments")
    public ResponseEntity<CommentResponse> saveOneCommentToABlog(
            @PathVariable Long blogId,
            @RequestBody CommentRequest commentRequest) {
        try {
            // Call your service to save the comment
            CommentResponse savedComment = commentService.saveComment(blogId, commentRequest);
            return ResponseEntity.ok(savedComment);
        } catch (Exception e) {
            // Other errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



}
