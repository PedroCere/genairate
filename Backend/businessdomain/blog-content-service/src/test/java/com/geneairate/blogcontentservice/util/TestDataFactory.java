package com.geneairate.blogcontentservice.util;

import com.geneairate.blogcontentservice.dto.ContentRequest;
import com.geneairate.blogcontentservice.dto.ContentResponse;
import com.geneairate.blogcontentservice.dto.PromptStyleTemplate;
import com.geneairate.blogcontentservice.model.BlogArticle;

import java.util.List;

public class TestDataFactory {

    public static ContentRequest defaultContentRequest() {
        return ContentRequest.builder()
                .userInput("Tendencias de IA en 2025")
                .tone("profesional")
                .format("lista")
                .language("es")
                .templateId(1L)
                .build();
    }

    public static ContentResponse defaultContentResponse() {
        return ContentResponse.builder()
                .title("5 tendencias clave de IA en 2025")
                .introduction("En este artículo exploramos...")
                .subtitle1("1. IA explicable")
                .content1("Será esencial para...")
                .subtitle2("2. IA generativa")
                .content2("Capacidades de generación de contenido...")
                .subtitle3("3. IA ética")
                .content3("Consideraciones en el desarrollo...")
                .conclusion("La IA seguirá transformando industrias...")
                .keywords(List.of("IA", "tendencias", "2025"))
                .metaDescription("Descubrí las tendencias clave en inteligencia artificial para el año 2025.")
                .build();
    }

    public static BlogArticle defaultBlogArticle() {
        return BlogArticle.builder()
                .id(1L)
                .title("5 tendencias clave de IA en 2025")
                .introduction("En este artículo exploramos...")
                .subtitle1("1. IA explicable")
                .content1("Será esencial para...")
                .subtitle2("2. IA generativa")
                .content2("Capacidades de generación de contenido...")
                .subtitle3("3. IA ética")
                .content3("Consideraciones en el desarrollo...")
                .conclusion("La IA seguirá transformando industrias...")
                .keywords(List.of("IA", "tendencias", "2025"))
                .metaDescription("Descubrí las tendencias clave...")
                .isDraft(false)
                .createdAt(System.currentTimeMillis())
                .userId(101L)
                .build();
    }

    public static PromptStyleTemplate defaultTemplate() {
        return PromptStyleTemplate.builder()
                .id(1L)
                .tone("profesional")
                .language("es")
                .length("400-600 palabras")
                .extraInstructions("""
                    Respondé solo en JSON:
                    {
                      "title": "...",
                      "introduction": "...",
                      "subtitle1": "...", "content1": "...",
                      "subtitle2": "...", "content2": "...",
                      "subtitle3": "...", "content3": "...",
                      "conclusion": "...",
                      "keywords": [...],
                      "meta_description": "..."
                    }
                    """)
                .isDefault(true)
                .build();
    }

}
