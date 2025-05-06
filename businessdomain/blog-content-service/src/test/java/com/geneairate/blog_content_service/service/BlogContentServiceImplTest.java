package com.geneairate.blog_content_service.service;

import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;
import com.geneairate.blog_content_service.gateway.IAPredictorGateway;
import com.geneairate.blog_content_service.repository.BlogContentRepository;
import com.geneairate.blog_content_service.service.impl.BlogContentServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BlogContentServiceImplTest {

    @Mock
    private IAPredictorGateway predictorGateway;

    @Mock
    private BlogContentRepository repository;

    @InjectMocks
    private BlogContentServiceImpl service;

    @Test
    void testGenerarContenido() {
        ContentRequest request = new ContentRequest("Ventajas del trabajo remoto", "informal", "lista", "es");

        ContentResponse responseMock = ContentResponse.builder()
                .title("Trabajo remoto")
                .introduction("Intro...")
                .conclusion("Fin.")
                .metaDescription("Resumen")
                .keywords(List.of("remoto", "trabajo"))
                .sections(List.of(new ContentResponse.SectionDTO("Subtítulo", "Contenido")))
                .build();

        when(predictorGateway.generarPrediccion(request)).thenReturn(responseMock);

        ContentResponse result = service.generarContenido(request);

        assertEquals("Trabajo remoto", result.getTitle());
        verify(repository).save(any());
    }
}
