package io.springApp.blog.repository;

import io.springApp.blog.model.Blog;
import io.springApp.blog.model.enums.BlogCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {


    @Query(value = "SELECT * FROM blog ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Blog> findRandomBlogs();

    List<Blog> findTop5ByOrderByViewsDesc();

    List<Blog> findByCategory(BlogCategory blogCategory);

    List<Blog> findByUserId(UUID userId);
}
