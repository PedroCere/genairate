package com.geneairate.blog_content_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String introduction;

    private String subtitle1;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String content1;

    private String subtitle2;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String content2;

    private String subtitle3;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String content3;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String conclusion;

    @ElementCollection
    private List<String> keywords;

    @Column(name = "meta_description")
    private String metaDescription;

    @Column(name = "is_draft")
    private boolean isDraft;

    @Column(name = "created_at")
    private long createdAt;

}
