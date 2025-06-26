package com.geneairate.templateservice.util;

import com.geneairate.templateservice.dto.PromptStyleTemplateRequest;
import com.geneairate.templateservice.model.PromptStyleTemplate;

import java.util.List;

public class TestDataUtil {

    public static final String DEFAULT_USER_ID = "user-test-001";

    public static PromptStyleTemplateRequest sampleRequest() {
        return PromptStyleTemplateRequest.builder()
                .name("Productivity Boost")
                .tone("professional")
                .language("en")
                .length("medium")
                .extraInstructions("Focus on actionable tips.")
                .build();
    }

    public static PromptStyleTemplate sampleTemplate(Long id, String userId, boolean isDefault) {
        return PromptStyleTemplate.builder()
                .id(id)
                .name("Productivity Boost")
                .tone("professional")
                .language("en")
                .length("medium")
                .extraInstructions("Focus on actionable tips.")
                .userId(userId)
                .isDefault(isDefault)
                .build();
    }

    public static List<PromptStyleTemplate> sampleTemplateList(String userId) {
        return List.of(
                sampleTemplate(1L, userId, false),
                sampleTemplate(2L, userId, false)
        );
    }

    public static PromptStyleTemplate sampleTemplate() {
        return sampleTemplate(1L, DEFAULT_USER_ID, false);
    }

    public static PromptStyleTemplateRequest sampleUpdatedRequest() {
        return PromptStyleTemplateRequest.builder()
                .name("Updated Template")
                .tone("casual")
                .language("es")
                .length("long")
                .extraInstructions("Incorpora ejemplos prácticos.")
                .build();
    }

    public static PromptStyleTemplate sampleDefaultTemplate(String userId) {
        return sampleTemplate(999L, userId, true);
    }




}
