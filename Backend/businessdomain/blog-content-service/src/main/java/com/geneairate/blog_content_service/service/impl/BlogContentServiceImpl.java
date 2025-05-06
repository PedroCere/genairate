package com.geneairate.blog_content_service.service.impl;

import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;
import com.geneairate.blog_content_service.gateway.IAPredictorGateway;
import com.geneairate.blog_content_service.model.BlogArticle;
import com.geneairate.blog_content_service.model.Section;
import com.geneairate.blog_content_service.repository.BlogContentRepository;
import com.geneairate.blog_content_service.service.BlogContentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BlogContentServiceImpl implements BlogContentService {
    private final IAPredictorGateway predictorGateway;
    private final BlogContentRepository repository;

    public BlogContentServiceImpl(IAPredictorGateway predictorGateway, BlogContentRepository repository) {
        this.predictorGateway = predictorGateway;
        this.repository = repository;
    }

    @Override
    public ContentResponse generarContenido(ContentRequest request) {
        ContentResponse response = predictorGateway.generarPrediccion(request);

        BlogArticle article = new BlogArticle(
                null,
                response.getTitle(),
                response.getIntroduction(),
                response.getSections().stream()
                        .map(sec -> new Section(null, sec.getSubtitle(), sec.getContent()))
                        .collect(Collectors.toList()),
                response.getConclusion(),
                response.getKeywords(),
                response.getMetaDescription(),
                true,
                System.currentTimeMillis()
        );
        repository.save(article);

        return response;
    }

    @Override
    public ContentResponse reescribirTexto(ContentRequest request) {
        return predictorGateway.reescribirTexto(request);
    }


    @Override
    public ContentResponse resumirContenido(ContentRequest request) {
        return predictorGateway.resumirContenido(request);
    }

    @Override
    public ContentResponse corrigirTexto(ContentRequest request) {
        return predictorGateway.corregirTexto(request);
    }

    @Override
    public ContentResponse traducirContenido(ContentRequest request) {
        return predictorGateway.traducirContenido(request);
    }


    @Override
    public ContentResponse obtenerPorId(String id) {
        BlogArticle article = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado"));
        return mapToDto(article);
    }

    @Override
    public void guardarArticulo(ContentResponse content) {
        BlogArticle article = new BlogArticle(
                UUID.randomUUID().toString(),
                content.getTitle(),
                content.getIntroduction(),
                content.getSections().stream()
                        .map(sec -> new Section(sec.getSubtitle(), sec.getContent()))
                        .collect(Collectors.toList()),
                content.getConclusion(),
                content.getKeywords(),
                content.getMetaDescription(),
                false,
                System.currentTimeMillis()
        );
        repository.save(article);
    }

    @Override
    public void eliminarPorId(String id) {
        repository.deleteById(id);
    }

    @Override
    public List<ContentResponse> obtenerRecientes() {
        return repository.findTop3ByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }


    private ContentResponse mapToDto(BlogArticle article) {
        return new ContentResponse(
                article.getId(),
                article.getTitle(),
                article.getIntroduction(),
                article.getSections().stream()
                        .map(sec -> new ContentResponse.SectionDTO(sec.getSubtitle(), sec.getContent()))
                        .collect(Collectors.toList()),
                article.getConclusion(),
                article.getKeywords(),
                article.getMetaDescription()
        );
    }

}
