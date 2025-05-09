package com.geneairate.blog_content_service.service;

import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;
import com.geneairate.blog_content_service.gateway.OpenRouterClient;
import com.geneairate.blog_content_service.model.BlogArticle;
import com.geneairate.blog_content_service.repository.BlogContentRepository;
import com.geneairate.blog_content_service.service.impl.BlogContentServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class BlogContentServiceImplTest {
    @Mock
    private OpenRouterClient predictorGateway;

    @Mock
    private BlogContentRepository repository;

    @InjectMocks
    private BlogContentServiceImpl service;

    @Test
    void deberiaGenerarContenido() {
        ContentRequest request = new ContentRequest();
        request.setUserInput("The future of AI");

        ContentResponse mockResponse = ContentResponse.builder()
                .title("Title")
                .introduction("Intro")
                .subtitle1("S1")
                .content1("C1")
                .subtitle2("S2")
                .content2("C2")
                .subtitle3("S3")
                .content3("C3")
                .conclusion("Conclusion")
                .keywords(List.of("AI", "future"))
                .metaDescription("meta")
                .build();

        when(predictorGateway.generarPrediccionConPrompt(anyString())).thenReturn(mockResponse);

        ContentResponse result = service.generarContenido(request);

        assertEquals("Title", result.getTitle());
    }

    @Test
    void testObtenerPorId() {
        BlogArticle article = BlogArticle.builder()
                .id(1L)
                .title("Title")
                .introduction("Intro")
                .build();

        when(repository.findById(1L)).thenReturn(Optional.of(article));

        ContentResponse response = service.obtenerPorId(1L);
        assertEquals("Title", response.getTitle());
    }

    @Test
    void testEliminarPorId() {
        service.eliminarPorId(1L);
        verify(repository).deleteById(1L);
    }

    @Test
    void testGuardarArticulo() {
        ContentResponse content = ContentResponse.builder()
                .title("Title")
                .introduction("Intro")
                .build();

        service.guardarArticulo(content);
        verify(repository).save(any(BlogArticle.class));
    }

    @Test
    void testObtenerRecientes() {
        BlogArticle article = BlogArticle.builder()
                .id(1L).title("Title").introduction("Intro").build();

        when(repository.findTop3ByOrderByCreatedAtDesc()).thenReturn(List.of(article));

        List<ContentResponse> result = service.obtenerRecientes();
        assertEquals(1, result.size());
    }
}
