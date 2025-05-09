package com.geneairate.blog_content_service.service.impl;

import com.geneairate.blog_content_service.dto.*;
import com.geneairate.blog_content_service.gateway.OpenRouterClient;
import com.geneairate.blog_content_service.gateway.TemplateClient;
import com.geneairate.blog_content_service.model.BlogArticle;
import com.geneairate.blog_content_service.repository.BlogContentRepository;
import com.geneairate.blog_content_service.service.BlogContentService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        String userId = "user-dev-001";
        PromptStyleTemplate template = templateClient.getDefaultTemplate(userId);

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
    public ContentResponse traducirContenido(TranslateRequest request) {
        BlogArticle article = repository.findById(request.getId())
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado"));

        String prompt = String.format("""
    [INST]
    Traduce el siguiente artículo completo al idioma: %s.

    Artículo:
    {
      "title": "%s",
      "introduction": "%s",
      "subtitle1": "%s",
      "content1": "%s",
      "subtitle2": "%s",
      "content2": "%s",
      "subtitle3": "%s",
      "content3": "%s",
      "conclusion": "%s",
      "keywords": [%s],
      "metaDescription": "%s"
    }

    IMPORTANTE: Devolveme solo el mismo JSON anterior pero traducido completamente.
    [/INST]
    """,
                request.getTargetLanguage(),
                article.getTitle(),
                article.getIntroduction(),
                article.getSubtitle1(),
                article.getContent1(),
                article.getSubtitle2(),
                article.getContent2(),
                article.getSubtitle3(),
                article.getContent3(),
                article.getConclusion(),
                article.getKeywords() != null ? article.getKeywords().stream().map(k -> "\"" + k + "\"").collect(Collectors.joining(", ")) : "",
                article.getMetaDescription());




        ContentResponse response = predictorGateway.generarPrediccionConPrompt(prompt);
        fullUpdate(request.getId(), response);
        return response;

    }

    @Override
    public ContentResponse obtenerPorId(Long id) {
        BlogArticle article = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado"));
        return mapToDto(article);
    }
    @Override
    public void fullUpdate(Long id, ContentResponse content) {
        BlogArticle article = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado"));

        article.setTitle(content.getTitle());
        article.setIntroduction(content.getIntroduction());
        article.setSubtitle1(content.getSubtitle1());
        article.setContent1(content.getContent1());
        article.setSubtitle2(content.getSubtitle2());
        article.setContent2(content.getContent2());
        article.setSubtitle3(content.getSubtitle3());
        article.setContent3(content.getContent3());
        article.setConclusion(content.getConclusion());
        article.setKeywords(content.getKeywords());
        article.setMetaDescription(content.getMetaDescription());

        repository.save(article);
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
    @Override
    public void partialUpdate(Long id, BlogArticlePatchRequest patch) {
        BlogArticle article = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));


        if (patch.getTitle() != null) article.setTitle(patch.getTitle());
        if (patch.getIntroduction() != null) article.setIntroduction(patch.getIntroduction());
        if (patch.getSubtitle1() != null) article.setSubtitle1(patch.getSubtitle1());
        if (patch.getContent1() != null) article.setContent1(patch.getContent1());
        if (patch.getSubtitle2() != null) article.setSubtitle2(patch.getSubtitle2());
        if (patch.getContent2() != null) article.setContent2(patch.getContent2());
        if (patch.getSubtitle3() != null) article.setSubtitle3(patch.getSubtitle3());
        if (patch.getContent3() != null) article.setContent3(patch.getContent3());
        if (patch.getConclusion() != null) article.setConclusion(patch.getConclusion());
        if (patch.getKeywords() != null) article.setKeywords(patch.getKeywords());
        if (patch.getMetaDescription() != null) article.setMetaDescription(patch.getMetaDescription());

        repository.save(article);
    }



}
