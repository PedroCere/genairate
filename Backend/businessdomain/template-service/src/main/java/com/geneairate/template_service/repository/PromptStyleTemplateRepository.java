package com.geneairate.template_service.repository;

import com.geneairate.template_service.model.PromptStyleTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PromptStyleTemplateRepository extends JpaRepository<PromptStyleTemplate, Long> {
    List<PromptStyleTemplate> findByUserId(String userId);

    Optional<PromptStyleTemplate> findByUserIdAndIsDefaultTrue(String userId);

}
