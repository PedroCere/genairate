package com.geneairate.blogcontentservice.data;

import com.geneairate.blogcontentservice.model.BlogArticle;
import com.geneairate.blogcontentservice.repository.BlogContentRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class TestDataLoader {

    private final BlogContentRepository repository;

    public TestDataLoader(BlogContentRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void loadTestData() {
        if (repository.count() == 0) {
            BlogArticle article1 = BlogArticle.builder()
                    .title("Test Blog 1")
                    .introduction("Introduction to test blog 1")
                    .subtitle1("Subtitle 1")
                    .content1("Content 1")
                    .subtitle2("Subtitle 2")
                    .content2("Content 2")
                    .subtitle3("Subtitle 3")
                    .content3("Content 3")
                    .conclusion("Conclusion")
                    .keywords(Arrays.asList("test", "blog"))
                    .metaDescription("Meta description")
                    .isDraft(false)
                    .createdAt(System.currentTimeMillis())
                    .userId(1L)
                    .build();

            BlogArticle article2 = BlogArticle.builder()
                    .title("Test Blog 2")
                    .introduction("Introduction to test blog 2")
                    .subtitle1("Subtitle 1")
                    .content1("Content 1")
                    .subtitle2("Subtitle 2")
                    .content2("Content 2")
                    .subtitle3("Subtitle 3")
                    .content3("Content 3")
                    .conclusion("Conclusion")
                    .keywords(Arrays.asList("test", "blog"))
                    .metaDescription("Meta description")
                    .isDraft(false)
                    .createdAt(System.currentTimeMillis())
                    .userId(1L)
                    .build();

            repository.save(article1);
            repository.save(article2);
        }
    }
}
