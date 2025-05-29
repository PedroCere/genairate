package com.geneairate.templateservice.repository;

import com.geneairate.templateservice.model.PromptStyleTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PromptStyleTemplateRepository extends JpaRepository<PromptStyleTemplate, Long> {
    List<PromptStyleTemplate> findByUserId(String userId);

    Optional<PromptStyleTemplate> findByUserIdAndIsDefaultTrue(String userId);

}
