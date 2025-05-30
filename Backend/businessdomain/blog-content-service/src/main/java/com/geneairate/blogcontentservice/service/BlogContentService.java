package com.geneairate.blogcontentservice.service;

import com.geneairate.blogcontentservice.dto.*;

import java.util.List;

public interface BlogContentService {

    ContentResponse generarContenido(ContentRequest request);

    ContentResponse reescribirTexto(ModifyContentRequest request);

    ContentResponse resumirContenido(ContentRequest request);

    ContentResponse corrigirTexto(ContentRequest request);

    ContentResponse traducirContenido(TranslateRequest request);

    ContentResponse obtenerPorId(Long id);

    void guardarArticulo(ContentResponse content);

    void eliminarPorId(Long id);

    List<ContentResponse> obtenerRecientes();

    List<ContentResponse> getAll();

    List<ContentResponse> getByUserId(Long userId);
    void partialUpdate(Long id, BlogArticlePatchRequest patch);

    public void fullUpdate(Long id, ContentResponse content);

}
