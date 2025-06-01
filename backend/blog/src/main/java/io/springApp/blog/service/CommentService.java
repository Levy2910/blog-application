package io.springApp.blog.service;

import io.springApp.blog.dto.CommentRequest;
import io.springApp.blog.dto.CommentResponse;
import io.springApp.blog.model.Blog;
import io.springApp.blog.model.Comment;
import io.springApp.blog.model.User;
import io.springApp.blog.repository.BlogRepository;
import io.springApp.blog.repository.CommentRepository;
import io.springApp.blog.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private BlogRepository blogRepository;
    private UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, BlogRepository blogRepository, UserRepository userRepository){
        this.commentRepository = commentRepository;
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    public List<CommentResponse> getCommentsByBlogId(Long blogId) {
        Optional<Blog> blog = blogRepository.findById(blogId);
        if (blog.isEmpty()) {
            // Option 1: throw exception
            return new ArrayList<>();
        }

        List<Comment> comments = commentRepository.findByBlogId(blogId);

        // Convert List<Comment> to List<CommentResponse>
        return comments.stream()
                .map(comment -> new CommentResponse(
                                comment.getId(),
                                comment.getContent(),
                                comment.getPostedAt(),
                                comment.getUser().getUsername(),
                                comment.getUser().getProfileImage()
                        )
                )
                .collect(Collectors.toList());
    }

    public CommentResponse saveComment(Long blogId, CommentRequest commentRequest) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found with id " + blogId));

        User user = userRepository.findByUsername(commentRequest.getUserName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with username " + commentRequest.getUserName()));
        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setBlog(blog);
        comment.setUser(user);
        // postedAt will be set automatically by @PrePersist

        Comment savedComment = commentRepository.save(comment);

        // Map entity to DTO
        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setCommentID(savedComment.getId());
        commentResponse.setContent(savedComment.getContent());
        commentResponse.setCreatedAt(savedComment.getPostedAt());
        commentResponse.setUserName(savedComment.getUser().getUsername());
        commentResponse.setUserProfileImage(savedComment.getUser().getProfileImage());

        return commentResponse;
    }
}
