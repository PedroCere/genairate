package com.geneairate.blog_content_service.gateway.impl;

import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class IAPredictorGatewayImpl implements com.geneairate.blog_content_service.gateway.IAPredictorGateway {

    private final RestTemplate restTemplate;
    private final String iaBaseUrl;

    public IAPredictorGatewayImpl(RestTemplate restTemplate,
                                  @Value("${genairate.ia.base-url:http://localhost:8000}") String iaBaseUrl) {
        this.restTemplate = restTemplate;
        this.iaBaseUrl = iaBaseUrl;
    }

    private ContentResponse postToIA(ContentRequest request, String endpoint) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ContentRequest> entity = new HttpEntity<>(request, headers);
        String fullUrl = iaBaseUrl + endpoint;

        ResponseEntity<ContentResponse> response = restTemplate.postForEntity(fullUrl, entity, ContentResponse.class);
        return response.getBody();
    }

    @Override
    public ContentResponse generarPrediccion(ContentRequest request) {
        return postToIA(request, "/predict");
    }

    @Override
    public ContentResponse reescribirTexto(ContentRequest request) {
        return postToIA(request, "/rewrite");
    }

    @Override
    public ContentResponse resumirContenido(ContentRequest request) {
        return postToIA(request, "/summarize");
    }

    @Override
    public ContentResponse corregirTexto(ContentRequest request) {
        return postToIA(request, "/correct");
    }

    @Override
    public ContentResponse traducirContenido(ContentRequest request) {
        return postToIA(request, "/translate");
    }


}
