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

    @NotBlank(message = "User input cannot be blank")
    @Column(name = "user_input")
    private String userInput;

    private String tone;     // opcional si usás template
    private String format;   // idem
    private String language; // idem
    private Long templateId; // opcional si se usa por defecto
}
