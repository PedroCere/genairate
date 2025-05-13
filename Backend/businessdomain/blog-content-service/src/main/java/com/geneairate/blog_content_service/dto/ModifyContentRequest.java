package com.geneairate.blog_content_service.dto;

import lombok.Data;

@Data
public class ModifyContentRequest {
    private Long id;
    private String extraInstructions;
}
