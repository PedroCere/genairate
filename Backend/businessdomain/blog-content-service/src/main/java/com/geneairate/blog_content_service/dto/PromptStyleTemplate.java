package com.geneairate.blog_content_service.dto;

import lombok.Data;

@Data
public class PromptStyleTemplate {
    private Long id;
    private String tone;
    private String language;
    private String length;
    private String extraInstructions;
}

