package io.springApp.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {

    private Long commentID;
    private String content;
    private LocalDateTime createdAt;
    private String userName;
    private String userProfileImage;
}
