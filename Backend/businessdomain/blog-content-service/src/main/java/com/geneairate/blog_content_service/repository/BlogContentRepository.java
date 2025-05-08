package com.geneairate.blog_content_service.repository;

import com.geneairate.blog_content_service.model.BlogArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogContentRepository extends JpaRepository<BlogArticle,Long> {

    List<BlogArticle> findTop3ByOrderByCreatedAtDesc();

}
