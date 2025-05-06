package com.geneairate.blog_content_service.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentResponse {

    private String id;
    private String title;
    private String introduction;
    private List<SectionDTO> sections;
    private String conclusion;
    private List<String> keywords;
    private String metaDescription;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SectionDTO {
        private String subtitle;
        private String content;
    }
}
