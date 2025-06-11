package com.geneairate.blogcontentservice.service;

import com.geneairate.blogcontentservice.dto.*;
import com.geneairate.blogcontentservice.gateway.OpenRouterClient;
import com.geneairate.blogcontentservice.gateway.TemplateClient;
import com.geneairate.blogcontentservice.model.BlogArticle;
import com.geneairate.blogcontentservice.repository.BlogContentRepository;
import com.geneairate.blogcontentservice.service.impl.BlogContentServiceImpl;

import com.geneairate.blogcontentservice.util.TestDataFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class BlogContentServiceImplTest {
    private BlogContentServiceImpl service;
    private BlogContentRepository repository;
    private OpenRouterClient predictorGateway;
    private TemplateClient templateClient;

    @BeforeEach
    void setUp() {
        repository = mock(BlogContentRepository.class);
        predictorGateway = mock(OpenRouterClient.class);
        templateClient = mock(TemplateClient.class);
        service = new BlogContentServiceImpl(predictorGateway, repository, templateClient);
    }

    @Test
    void shouldGenerateContentWithTemplateId() {
        ContentRequest request = TestDataFactory.defaultContentRequest();
        ContentResponse generated = TestDataFactory.defaultContentResponse();
        PromptStyleTemplate template = TestDataFactory.defaultTemplate();

        when(templateClient.getTemplateById(1L)).thenReturn(template);
        when(predictorGateway.generatePredictionWithPrompt(any())).thenReturn(generated);
        when(repository.save(any())).thenAnswer(i -> {
            BlogArticle saved = i.getArgument(0);
            saved.setId(100L);
            return saved;
        });

        ContentResponse result = service.generateContent(request);

        assertThat(result.getTitle()).isEqualTo(generated.getTitle());
        assertThat(result.getId()).isEqualTo(100L);
    }

    @Test
    void rewriteTextSuccessfully() {
        BlogArticle article = TestDataFactory.defaultBlogArticle();
        ModifyContentRequest request = new ModifyContentRequest(article.getId(), "reescribilo informal");
        ContentResponse rewritten = TestDataFactory.defaultContentResponse();

        when(repository.findById(article.getId())).thenReturn(Optional.of(article));
        when(predictorGateway.generatePredictionWithPrompt(any())).thenReturn(rewritten);

        ContentResponse result = service.reescribirTexto(request);

        assertThat(result.getTitle()).isEqualTo(rewritten.getTitle());
        verify(repository).save(any());
    }

    @Test
    void shouldSummarizeContentSuccessfully() {
        ContentRequest req = TestDataFactory.defaultContentRequest();
        ContentResponse res = TestDataFactory.defaultContentResponse();
        when(predictorGateway.resumirContenido(req)).thenReturn(res);

        assertThat(service.resumirContenido(req)).isEqualTo(res);
    }

    @Test
    void shouldCorrectTextSuccessfully() {
        ContentRequest req = TestDataFactory.defaultContentRequest();
        ContentResponse res = TestDataFactory.defaultContentResponse();
        when(predictorGateway.corregirTexto(req)).thenReturn(res);

        assertThat(service.corrigirTexto(req)).isEqualTo(res);
    }

    @Test
    void shouldTranslateContentSuccessfully() {
        BlogArticle article = TestDataFactory.defaultBlogArticle();
        TranslateRequest request = new TranslateRequest(article.getId(), "en");
        ContentResponse translated = TestDataFactory.defaultContentResponse();

        when(repository.findById(article.getId())).thenReturn(Optional.of(article));
        when(predictorGateway.generatePredictionWithPrompt(any())).thenReturn(translated);

        ContentResponse result = service.traducirContenido(request);
        assertThat(result).isEqualTo(translated);
        verify(repository).save(any());
    }

    @Test
    void shouldReturnArticleByIdIfExists() {
        BlogArticle article = TestDataFactory.defaultBlogArticle();
        when(repository.findById(article.getId())).thenReturn(Optional.of(article));

        ContentResponse response = service.obtenerPorId(article.getId());

        assertThat(response.getTitle()).isEqualTo(article.getTitle());
    }

    @Test
    void shouldSaveNewArticleWhenIdIsNull() {
        ContentResponse dto = TestDataFactory.defaultContentResponse();
        dto.setId(null);
        service.guardarArticulo(dto);
        verify(repository).save(any());
    }

    @Test
    void shouldUpdateExistingArticleWhenIdExists() {
        BlogArticle existing = TestDataFactory.defaultBlogArticle();
        ContentResponse mod = TestDataFactory.defaultContentResponse();
        mod.setId(existing.getId());

        when(repository.findById(mod.getId())).thenReturn(Optional.of(existing));

        service.guardarArticulo(mod);
        verify(repository).save(existing);
    }

    @Test
    void shouldDeleteArticleById() {
        service.eliminarPorId(101L);
        verify(repository).deleteById(101L);
    }

    @Test
    void shouldReturnMostRecentArticles() {
        List<BlogArticle> articles = List.of(TestDataFactory.defaultBlogArticle());
        when(repository.findTop3ByOrderByCreatedAtDesc()).thenReturn(articles);

        List<ContentResponse> result = service.obtenerRecientes();
        assertThat(result).hasSize(1);
    }

    @Test
    void shouldReturnArticlesByUserId() {
        List<BlogArticle> articles = List.of(TestDataFactory.defaultBlogArticle());
        when(repository.findByUserId(1L)).thenReturn(articles);

        List<ContentResponse> result = service.getByUserId(1L);
        assertThat(result).hasSize(1);
    }

    @Test
    void  shouldReturnAllArticles() {
        List<BlogArticle> articles = List.of(TestDataFactory.defaultBlogArticle());
        when(repository.findAll()).thenReturn(articles);

        List<ContentResponse> result = service.getAll();
        assertThat(result).hasSize(1);
    }

    @Test
    void shouldPartiallyUpdateFieldsWhenPresent() {
        BlogArticle article = TestDataFactory.defaultBlogArticle();
        BlogArticlePatchRequest patch = BlogArticlePatchRequest.builder()
                .title("Nuevo Título")
                .content1("Contenido modificado")
                .build();

        when(repository.findById(article.getId())).thenReturn(Optional.of(article));

        service.partialUpdate(article.getId(), patch);

        assertThat(article.getTitle()).isEqualTo("Nuevo Título");
        assertThat(article.getContent1()).isEqualTo("Contenido modificado");
        verify(repository).save(article);
    }

    @Test
    void shouldThrowExceptionWhenArticleNotFoundForPartialUpdate() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.partialUpdate(999L, new BlogArticlePatchRequest()))
                .isInstanceOf(ResponseStatusException.class);
    }
}
