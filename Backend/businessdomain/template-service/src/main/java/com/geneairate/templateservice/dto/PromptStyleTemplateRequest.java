package com.geneairate.templateservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PromptStyleTemplateRequest {

    private String name;
    private String tone;
    private String language;
    private String length;
    private String extraInstructions;
}
