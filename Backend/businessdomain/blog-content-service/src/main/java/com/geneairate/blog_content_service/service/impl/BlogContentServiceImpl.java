package com.geneairate.blog_content_service.service.impl;

import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;
import com.geneairate.blog_content_service.dto.PromptStyleTemplate;
import com.geneairate.blog_content_service.gateway.OpenRouterClient;
import com.geneairate.blog_content_service.gateway.TemplateClient;
import com.geneairate.blog_content_service.model.BlogArticle;
import com.geneairate.blog_content_service.repository.BlogContentRepository;
import com.geneairate.blog_content_service.service.BlogContentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogContentServiceImpl implements BlogContentService {
    private final OpenRouterClient predictorGateway;
    private final BlogContentRepository repository;
    private final TemplateClient templateClient;

    public BlogContentServiceImpl(OpenRouterClient predictorGateway, BlogContentRepository repository, TemplateClient templateClient) {
        this.predictorGateway = predictorGateway;
        this.repository = repository;
        this.templateClient = templateClient;
    }

    @Override
    public ContentResponse generarContenido(ContentRequest request) {
        PromptStyleTemplate template = templateClient.getTemplateById(request.getTemplateId());

        String prompt = String.format("""
                                        [INST]
                                        Generá un artículo de blog en %s sobre: \"%s\".

                                        Formato deseado:
                                        - Título llamativo
                                        - Introducción (1–2 párrafos)
                                        - 3 subtítulos temáticos con desarrollo textual (deben ser conceptos distintos del tema)
                                        - Conclusión inspiradora o resumida

                                        Respondé en JSON con los campos exactos:
                                        {
                                          \"title\": \"string\",
                                          \"introduction\": \"string\",
                                          \"subtitle1\": \"string\",
                                          \"content1\": \"string\",
                                          \"subtitle2\": \"string\",
                                          \"content2\": \"string\",
                                          \"subtitle3\": \"string\",
                                          \"content3\": \"string\",
                                          \"conclusion\": \"string\",
                                          \"keywords\": [\"string\"],
                                          \"metaDescription\": \"string\"
                                        }

                                        Tono: %s | Longitud: %s
                                        %s
                                        IMPORTANTE: No agregues explicaciones ni texto fuera del JSON.
                                        [/INST]
                        """,
                template.getLanguage(),
                request.getUserInput(),
                template.getTone(),
                template.getLength(),
                template.getExtraInstructions() != null ? template.getExtraInstructions() : ""
        );

        ContentResponse response = predictorGateway.generarPrediccionConPrompt(prompt);

        BlogArticle article = BlogArticle.builder()
                .title(response.getTitle())
                .introduction(response.getIntroduction())
                .subtitle1(response.getSubtitle1())
                .content1(response.getContent1())
                .subtitle2(response.getSubtitle2())
                .content2(response.getContent2())
                .subtitle3(response.getSubtitle3())
                .content3(response.getContent3())
                .conclusion(response.getConclusion())
                .keywords(response.getKeywords())
                .metaDescription(response.getMetaDescription())
                .isDraft(true)
                .createdAt(System.currentTimeMillis())
                .build();

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
    public ContentResponse obtenerPorId(Long id) {
        BlogArticle article = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado"));
        return mapToDto(article);
    }

    @Override
    public void guardarArticulo(ContentResponse content) {
        BlogArticle article = BlogArticle.builder()
                .title(content.getTitle())
                .introduction(content.getIntroduction())
                .subtitle1(content.getSubtitle1())
                .content1(content.getContent1())
                .subtitle2(content.getSubtitle2())
                .content2(content.getContent2())
                .subtitle3(content.getSubtitle3())
                .content3(content.getContent3())
                .conclusion(content.getConclusion())
                .keywords(content.getKeywords())
                .metaDescription(content.getMetaDescription())
                .isDraft(false)
                .createdAt(System.currentTimeMillis())
                .build();

        repository.save(article);
    }

    @Override
    public void eliminarPorId(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<ContentResponse> obtenerRecientes() {
        return repository.findTop3ByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    private ContentResponse mapToDto(BlogArticle article) {
        return ContentResponse.builder()
                .id(article.getId())
                .title(article.getTitle())
                .introduction(article.getIntroduction())
                .subtitle1(article.getSubtitle1())
                .content1(article.getContent1())
                .subtitle2(article.getSubtitle2())
                .content2(article.getContent2())
                .subtitle3(article.getSubtitle3())
                .content3(article.getContent3())
                .conclusion(article.getConclusion())
                .keywords(article.getKeywords())
                .metaDescription(article.getMetaDescription())
                .build();
    }

    @Override
    public List<ContentResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

}
