package com.geneairate.templateservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromptStyleTemplateRequest {

    private String name;
    private String tone;
    private String language;
    private String length;
    private String extraInstructions;
}
