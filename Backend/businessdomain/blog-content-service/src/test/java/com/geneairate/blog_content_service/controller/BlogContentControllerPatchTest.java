package com.geneairate.blog_content_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.geneairate.blog_content_service.dto.BlogArticlePatchRequest;
import com.geneairate.blog_content_service.model.BlogArticle;
import com.geneairate.blog_content_service.repository.BlogContentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;


import static org.springframework.http.RequestEntity.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BlogContentControllerPatchTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private BlogContentRepository repository;

    private Long existingArticleId;

    @BeforeEach
    void setUp() {
        BlogArticle article = BlogArticle.builder()
                .title("Original Title")
                .introduction("Original intro")
                .subtitle1("S1").content1("C1")
                .subtitle2("S2").content2("C2")
                .subtitle3("S3").content3("C3")
                .conclusion("Conclusion")
                .keywords(List.of("one", "two"))
                .metaDescription("meta")
                .isDraft(false)
                .createdAt(System.currentTimeMillis())
                .build();

        existingArticleId = repository.save(article).getId();
    }

//    @Test
//    void patchBlogArticle_shouldUpdateTitleOnly() throws Exception {
//        BlogArticlePatchRequest patch = new BlogArticlePatchRequest();
//        patch.setTitle("Updated Title");
//
//        mockMvc.perform(patch("/api/v1/content/" + existingArticleId)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(patch)))
//                .andExpect(status().isNoContent());
//    }
//
//    @Test
//    void patchNonExistingBlog_shouldReturn404() throws Exception {
//        BlogArticlePatchRequest patch = new BlogArticlePatchRequest();
//        patch.setTitle("Does not matter");
//
//        mockMvc.perform(patch("/api/v1/content/999999")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(patch)))
//                .andExpect(status().isNotFound());
//    }
}
