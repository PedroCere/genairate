package com.geneairate.blogcontentservice.dto;

import lombok.Data;

@Data
public class ModifyContentRequest {
    private Long id;
    private String extraInstructions;
}
