package com.geneairate.blog_content_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subtitle;

    @Column(length = 5000)
    private String content;

    public Section(String subtitle, String content) {
        this.subtitle = subtitle;
        this.content = content;
    }
}
