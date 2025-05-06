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
    private String id;

    private String title;
    private String introduction;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "article_id")
    private List<Section> sections;

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
