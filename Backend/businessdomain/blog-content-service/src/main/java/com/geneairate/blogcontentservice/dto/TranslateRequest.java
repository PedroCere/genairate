package com.geneairate.blogcontentservice.dto;

import lombok.Data;

@Data
public class TranslateRequest {
    private Long id;
    private String targetLanguage;
}
