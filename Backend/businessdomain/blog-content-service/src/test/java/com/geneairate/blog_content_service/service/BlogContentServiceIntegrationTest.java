package com.geneairate.blog_content_service.service;

import com.geneairate.blog_content_service.model.BlogArticle;
import com.geneairate.blog_content_service.repository.BlogContentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class BlogContentServiceIntegrationTest {

    @Autowired
    private BlogContentRepository repository;

    @Test
    void guardarYRecuperarArticulo() {
        BlogArticle article = BlogArticle.builder()
                .title("Integration Test")
                .introduction("Testing intro")
                .subtitle1("S1").content1("C1")
                .subtitle2("S2").content2("C2")
                .subtitle3("S3").content3("C3")
                .conclusion("The end")
                .keywords(List.of("test", "integration"))
                .metaDescription("meta")
                .isDraft(false)
                .createdAt(System.currentTimeMillis())
                .build();

        BlogArticle saved = repository.save(article);
        assertNotNull(saved.getId());

        BlogArticle retrieved = repository.findById(saved.getId()).orElse(null);
        assertNotNull(retrieved);
        assertEquals("Integration Test", retrieved.getTitle());
    }
}
