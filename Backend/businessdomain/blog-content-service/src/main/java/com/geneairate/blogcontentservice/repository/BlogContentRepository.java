package com.geneairate.blogcontentservice.repository;

import com.geneairate.blogcontentservice.model.BlogArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogContentRepository extends JpaRepository<BlogArticle,Long> {

    List<BlogArticle> findTop3ByOrderByCreatedAtDesc();

    List<BlogArticle> findByUserId(Long userId);

}
