package com.geneairate.blogcontentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModifyContentRequest {
    private Long id;
    private String extraInstructions;
}
