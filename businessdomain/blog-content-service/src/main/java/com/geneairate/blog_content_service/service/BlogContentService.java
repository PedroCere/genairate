package com.geneairate.blog_content_service.service;

import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;

import java.util.List;

public interface BlogContentService {

    ContentResponse generarContenido(ContentRequest request);

    ContentResponse reescribirTexto(ContentRequest request);

    ContentResponse resumirContenido(ContentRequest request);

    ContentResponse corrigirTexto(ContentRequest request);

    ContentResponse traducirContenido(ContentRequest request);

    ContentResponse obtenerPorId(String id);

    void guardarArticulo(ContentResponse content);

    void eliminarPorId(String id);

    List<ContentResponse> obtenerRecientes();
}
