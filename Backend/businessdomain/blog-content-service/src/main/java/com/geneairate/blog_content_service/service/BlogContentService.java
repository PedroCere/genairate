package com.geneairate.blog_content_service.service;

import com.geneairate.blog_content_service.dto.BlogArticlePatchRequest;
import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;
import com.geneairate.blog_content_service.model.BlogArticle;

import java.util.List;

public interface BlogContentService {

    ContentResponse generarContenido(ContentRequest request);

    ContentResponse reescribirTexto(ContentRequest request);

    ContentResponse resumirContenido(ContentRequest request);

    ContentResponse corrigirTexto(ContentRequest request);

    ContentResponse traducirContenido(ContentRequest request);

    ContentResponse obtenerPorId(Long id);

    void guardarArticulo(ContentResponse content);

    void eliminarPorId(Long id);

    List<ContentResponse> obtenerRecientes();

    List<ContentResponse> getAll();

    void partialUpdate(Long id, BlogArticlePatchRequest patch);

}
