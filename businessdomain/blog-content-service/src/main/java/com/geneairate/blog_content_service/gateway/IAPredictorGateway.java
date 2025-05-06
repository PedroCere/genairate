package com.geneairate.blog_content_service.gateway;

import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;

public interface IAPredictorGateway {

    ContentResponse generarPrediccion(ContentRequest request);

    ContentResponse reescribirTexto(ContentRequest request);

    ContentResponse resumirContenido(ContentRequest request);

    ContentResponse corregirTexto(ContentRequest request);

    ContentResponse traducirContenido(ContentRequest request);
}
