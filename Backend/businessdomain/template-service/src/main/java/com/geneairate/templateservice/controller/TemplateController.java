package com.geneairate.templateservice.controller;

import com.geneairate.templateservice.dto.PromptStyleTemplateRequest;
import com.geneairate.templateservice.model.PromptStyleTemplate;
import com.geneairate.templateservice.service.TemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/templates")
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromptStyleTemplate> getTemplate(@PathVariable("id") Long id) {
        return ResponseEntity.ok(templateService.getTemplateById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PromptStyleTemplate>> getByUser(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(templateService.getTemplatesByUser(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Long> create(@RequestBody PromptStyleTemplateRequest request, @PathVariable("userId") String userId) {
        return ResponseEntity.ok(templateService.createTemplate(request, userId));
    }

    @PutMapping("/{id}/{userId}")
    public ResponseEntity<Void> update(@PathVariable("id") Long id, @PathVariable("userId") String userId,
                                       @RequestBody PromptStyleTemplateRequest request) {
        templateService.updateTemplate(id, request, userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/{userId}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id, @PathVariable("userId") String userId) {
        templateService.deleteTemplate(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/default/{userId}")
    public ResponseEntity<PromptStyleTemplate> getDefaultTemplate(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(templateService.getDefaultTemplateForUser(userId));
    }

}
