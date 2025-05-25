package io.springApp.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogResponse {
    private Long id;
    private String title;
    private String content;
    private String imagePath;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String userName;
    private String aboutUser;

}
