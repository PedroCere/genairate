package com.geneairate.blog_content_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class BlogArticlePatchRequest {
    private String title;
    private String introduction;
    private String subtitle1;
    private String content1;
    private String subtitle2;
    private String content2;
    private String subtitle3;
    private String content3;
    private String conclusion;
    private List<String> keywords;
    private String metaDescription;
}
