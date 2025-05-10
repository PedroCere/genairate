package com.geneairate.template_service.dto;

import lombok.Data;

@Data
public class PromptStyleTemplateRequest {

    private String name;
    private String tone;
    private String language;
    private String length;
    private String extraInstructions;
}
