package com.geneairate.blogcontentservice.model;

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

    @Lob
    @Column(name = "meta_description", columnDefinition = "TEXT")
    private String metaDescription;

    @Column(name = "is_draft")
    private boolean isDraft;

    @Column(name = "created_at")
    private long createdAt;

    @Column(name = "user_id")
    private Long userId;

}
