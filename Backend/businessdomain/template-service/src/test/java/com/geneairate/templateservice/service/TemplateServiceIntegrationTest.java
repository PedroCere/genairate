package com.geneairate.templateservice.service;

import com.geneairate.templateservice.model.PromptStyleTemplate;
import com.geneairate.templateservice.repository.PromptStyleTemplateRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class TemplateServiceIntegrationTest {

    @Autowired
    private PromptStyleTemplateRepository repository;

    @Test
    void guardarYRecuperarTemplate() {
        PromptStyleTemplate template = PromptStyleTemplate.builder()
                .name("Default")
                .tone("neutral")
                .language("en")
                .length("500 words")
                .extraInstructions("none")
                .userId("user-dev-001")
                .isDefault(true)
                .build();

        PromptStyleTemplate saved = repository.save(template);
        assertNotNull(saved.getId());

        PromptStyleTemplate result = repository.findById(saved.getId()).orElse(null);
        assertNotNull(result);
        assertEquals("Default", result.getName());
    }
}
