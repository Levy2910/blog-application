package io.springApp.blog.repository;

import io.springApp.blog.model.Blog;
import io.springApp.blog.model.enums.BlogCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {


    @Query(value = "SELECT * FROM blog ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Blog> findRandomBlogs();

    List<Blog> findTop10ByOrderByViewsDesc();

    List<Blog> findByCategory(BlogCategory blogCategory);
}
