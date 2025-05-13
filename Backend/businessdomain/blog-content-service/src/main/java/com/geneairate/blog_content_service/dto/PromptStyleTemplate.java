package com.geneairate.blog_content_service.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromptStyleTemplate {
    private Long id;
    private String tone;
    private String language;
    private String length;
    private String extraInstructions;
    @Column(name = "is_default")
    private boolean isDefault;
}

