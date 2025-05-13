package com.geneairate.blog_content_service.dto;

import lombok.Data;

@Data
public class TranslateRequest {
    private Long id;
    private String targetLanguage;
}
