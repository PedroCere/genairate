package com.geneairate.templateservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromptStyleTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String tone;

    @Column(nullable = false)
    private String language;

    private String length;

    @Column(length = 500)
    @JoinColumn(name = "extra_instructions")
    private String extraInstructions;

    @Column(nullable = false)
    private String userId;

    @Column(name = "is_default")
    private Boolean isDefault;


}
