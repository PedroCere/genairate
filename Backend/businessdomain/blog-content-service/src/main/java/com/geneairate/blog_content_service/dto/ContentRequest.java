package com.geneairate.blog_content_service.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentRequest {

    @NotBlank
    @Column(name = "user_input")
    private String userInput;

    private String tone = "profesional";
    private String format = "lista";
    private String language = "es";
    private Long templateId;
}
