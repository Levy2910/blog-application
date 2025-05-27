package io.springApp.blog.dto;

import io.springApp.blog.model.enums.BlogCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogRequest {
    private String title;
    private String shortDescription;
    private String content;
    private BlogCategory category;
}

