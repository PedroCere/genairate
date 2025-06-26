package com.geneairate.templateservice.service;

import com.geneairate.templateservice.dto.PromptStyleTemplateRequest;
import com.geneairate.templateservice.model.PromptStyleTemplate;
import com.geneairate.templateservice.repository.PromptStyleTemplateRepository;
import com.geneairate.templateservice.util.TestDataUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;


@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class TemplateServiceTest {

    private TemplateService service;
    private PromptStyleTemplateRepository repository;

    @BeforeEach
    void setUp() {
        repository = mock(PromptStyleTemplateRepository.class);
        service = new TemplateService(repository);
    }

    @Test
    void getTemplateById_returnsTemplate() {
        PromptStyleTemplate template = TestDataUtil.sampleTemplate(1L, TestDataUtil.DEFAULT_USER_ID, false);
        when(repository.findById(1L)).thenReturn(Optional.of(template));

        PromptStyleTemplate result = service.getTemplateById(1L);

        assertThat(result).isEqualTo(template);
    }

    @Test
    void getTemplateById_notFound_throwsException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getTemplateById(99L))
                .isInstanceOf(ResponseStatusException.class);
    }

    @Test
    void getTemplatesByUser_returnsList() {
        List<PromptStyleTemplate> templates = TestDataUtil.sampleTemplateList(TestDataUtil.DEFAULT_USER_ID);
        when(repository.findByUserId(TestDataUtil.DEFAULT_USER_ID)).thenReturn(templates);

        List<PromptStyleTemplate> result = service.getTemplatesByUser(TestDataUtil.DEFAULT_USER_ID);

        assertThat(result).hasSize(2);
    }

    @Test
    void createTemplate_savesAndReturnsId() {
        PromptStyleTemplateRequest dto = TestDataUtil.sampleRequest();
        PromptStyleTemplate saved = TestDataUtil.sampleTemplate(10L, TestDataUtil.DEFAULT_USER_ID, false);

        when(repository.save(any())).thenReturn(saved);

        Long id = service.createTemplate(dto, TestDataUtil.DEFAULT_USER_ID);

        assertThat(id).isEqualTo(10L);
        verify(repository).save(any());
    }

    @Test
    void updateTemplate_authorized_updatesTemplate() {
        PromptStyleTemplate existing = TestDataUtil.sampleTemplate(1L, TestDataUtil.DEFAULT_USER_ID, false);
        PromptStyleTemplateRequest dto = TestDataUtil.sampleRequest();

        when(repository.findById(1L)).thenReturn(Optional.of(existing));

        service.updateTemplate(1L, dto, TestDataUtil.DEFAULT_USER_ID);

        assertThat(existing.getName()).isEqualTo(dto.getName());
        verify(repository).save(existing);
    }

    @Test
    void updateTemplate_unauthorized_throwsException() {
        PromptStyleTemplate existing = TestDataUtil.sampleTemplate(1L, "other-user", false);
        PromptStyleTemplateRequest dto = TestDataUtil.sampleRequest();

        when(repository.findById(1L)).thenReturn(Optional.of(existing));

        assertThatThrownBy(() -> service.updateTemplate(1L, dto, TestDataUtil.DEFAULT_USER_ID))
                .isInstanceOf(SecurityException.class);
    }

    @Test
    void deleteTemplate_unauthorized_throwsException() {
        PromptStyleTemplate existing = TestDataUtil.sampleTemplate(1L, "other-user", false);
        when(repository.findById(1L)).thenReturn(Optional.of(existing));

        assertThatThrownBy(() -> service.deleteTemplate(1L, TestDataUtil.DEFAULT_USER_ID))
                .isInstanceOf(SecurityException.class);
    }


    @Test
    void getDefaultTemplateForUser_returnsTemplate() {
        PromptStyleTemplate defaultTemplate = TestDataUtil.sampleTemplate(5L, TestDataUtil.DEFAULT_USER_ID, true);
        when(repository.findByUserIdAndIsDefaultTrue(TestDataUtil.DEFAULT_USER_ID)).thenReturn(Optional.of(defaultTemplate));

        PromptStyleTemplate result = service.getDefaultTemplateForUser(TestDataUtil.DEFAULT_USER_ID);

        assertThat(result).isEqualTo(defaultTemplate);
    }

    @Test
    void getDefaultTemplateForUser_notFound_throwsException() {
        when(repository.findByUserIdAndIsDefaultTrue(TestDataUtil.DEFAULT_USER_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getDefaultTemplateForUser(TestDataUtil.DEFAULT_USER_ID))
                .isInstanceOf(ResponseStatusException.class);
    }


}
