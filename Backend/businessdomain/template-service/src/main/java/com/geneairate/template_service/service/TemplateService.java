package com.geneairate.template_service.service;

import com.geneairate.template_service.dto.PromptStyleTemplateRequest;
import com.geneairate.template_service.model.PromptStyleTemplate;
import com.geneairate.template_service.repository.PromptStyleTemplateRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TemplateService {

    private final PromptStyleTemplateRepository repository;

    public TemplateService(PromptStyleTemplateRepository repository) {
        this.repository = repository;
    }

    public PromptStyleTemplate getTemplateById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Template no encontrado"));
    }

    public List<PromptStyleTemplate> getTemplatesByUser(String userId) {
        return repository.findByUserId(userId);
    }

    public Long createTemplate(PromptStyleTemplateRequest dto, String userId) {
        var template = PromptStyleTemplate.builder()
                .name(dto.getName())
                .tone(dto.getTone())
                .language(dto.getLanguage())
                .length(dto.getLength())
                .extraInstructions(dto.getExtraInstructions())
                .userId(userId)
                .build();
        return repository.save(template).getId();
    }

    public void updateTemplate(Long id, PromptStyleTemplateRequest dto, String userId) {
        var template = repository.findById(id).orElseThrow();
        if (!template.getUserId().equals(userId)) throw new SecurityException("No autorizado");
        template.setName(dto.getName());
        template.setTone(dto.getTone());
        template.setLanguage(dto.getLanguage());
        template.setLength(dto.getLength());
        template.setExtraInstructions(dto.getExtraInstructions());
        repository.save(template);
    }

    public void deleteTemplate(Long id, String userId) {
        var template = repository.findById(id).orElseThrow();
        if (!template.getUserId().equals(userId)) throw new SecurityException("No autorizado");
        repository.delete(template);
    }

    public PromptStyleTemplate getDefaultTemplateForUser(String userId) {
        return repository.findByUserIdAndIsDefaultTrue(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No se encontró plantilla por defecto para el usuario " + userId));
    }


}
