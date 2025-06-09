package com.geneairate.templateservice.service;

import com.geneairate.templateservice.dto.PromptStyleTemplateRequest;
import com.geneairate.templateservice.model.PromptStyleTemplate;
import com.geneairate.templateservice.repository.PromptStyleTemplateRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class TemplateServiceTest {

    @Mock
    private PromptStyleTemplateRepository repository;

    private String userId = "user-dev-001";

    @InjectMocks
    private TemplateService service;

    @Test
    void deberiaObtenerTemplatePorDefecto() {
        PromptStyleTemplate template = PromptStyleTemplate.builder()
                .id(1L)
                .name("Default Template")
                .tone("friendly")
                .language("en")
                .length("500 words")
                .userId("user-dev-001")
                .isDefault(true)
                .build();

        when(repository.findByUserIdAndIsDefaultTrue("user-dev-001"))
                .thenReturn(Optional.of(template));

        PromptStyleTemplate result = service.getDefaultTemplateForUser("user-dev-001");

        assertNotNull(result);
        assertEquals("friendly", result.getTone());
    }

    @Test
    void testGetTemplatesByUser() {
        when(repository.findByUserId("user-dev-001"))
                .thenReturn(List.of(new PromptStyleTemplate()));

        List<PromptStyleTemplate> result = service.getTemplatesByUser("user-dev-001");
        assertEquals(1, result.size());
    }

    @Test
    void testGetTemplateById() {
        PromptStyleTemplate template = PromptStyleTemplate.builder().id(1L).name("X").build();
        when(repository.findById(1L)).thenReturn(Optional.of(template));

        PromptStyleTemplate result = service.getTemplateById(1L);
        assertEquals("X", result.getName());
    }

    @Test
    void testCreateTemplate() {
        PromptStyleTemplateRequest template = PromptStyleTemplateRequest.builder().name("New").build();
        service.createTemplate(template,userId);
        verify(repository).save(any(PromptStyleTemplate.class));

    }

    @Test
    void testDeleteTemplate() {
        service.deleteTemplate(1L,userId);
        verify(repository).deleteById(1L);
    }
}
