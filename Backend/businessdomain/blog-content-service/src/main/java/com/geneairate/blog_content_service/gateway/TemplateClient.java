package com.geneairate.blog_content_service.gateway;

import com.geneairate.blog_content_service.dto.PromptStyleTemplate;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "template-service", url = "http://localhost:8082")
public interface TemplateClient {

    @GetMapping("/api/v1/templates/{id}")
    PromptStyleTemplate getTemplateById(@PathVariable("id") Long id);
}
