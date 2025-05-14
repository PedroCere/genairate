package com.geneairate.blogcontentservice.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentResponse {

    private Long id;
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
