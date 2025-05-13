package com.geneairate.blog_content_service.gateway;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class OpenRouterClient {

    private static final String API_URL = "https://openrouter.ai/api/v1/chat/completions";
    @Value("${openrouter.api.key}")
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ContentResponse generarPrediccionConPrompt(String prompt) {
        String json = generarRawRespuesta(prompt);
        return parsearRespuesta(json);
    }

    public ContentResponse reescribirTexto(ContentRequest request) {
        String prompt = String.format("""
            [INST]
            Reescribí el siguiente contenido en un tono %s y en idioma %s:
            \"%s\"
            IMPORTANTE: Respondé solo en JSON válido con título, secciones, conclusión, palabras clave y descripción meta.
            [/INST]
        """, request.getTone(), request.getLanguage(), request.getUserInput());
        return generarPrediccionConPrompt(prompt);
    }

    public ContentResponse resumirContenido(ContentRequest request) {
        String prompt = String.format("""
            [INST]
            Resumí el siguiente texto manteniendo el lenguaje %s y tono %s:
            \"%s\"
            IMPORTANTE: Respondé solo en JSON con introducción, 2 secciones clave y una conclusión.
            [/INST]
        """, request.getLanguage(), request.getTone(), request.getUserInput());
        return generarPrediccionConPrompt(prompt);
    }

    public ContentResponse corregirTexto(ContentRequest request) {
        String prompt = String.format("""
            [INST]
            Corregí ortografía y gramática del siguiente texto sin cambiar su estilo:
            \"%s\"
            IMPORTANTE: Respondé solo en JSON.
            [/INST]
        """, request.getUserInput());
        return generarPrediccionConPrompt(prompt);
    }

    private String generarRawRespuesta(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "mistralai/mistral-7b-instruct");
        body.put("max_tokens", 1500);
        body.put("temperature", 0.7);

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", "Respondé solo en JSON válido con campos estructurados."));
        messages.add(Map.of("role", "user", "content", prompt));
        body.put("messages", messages);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(API_URL, entity, String.class);

        return response.getBody();
    }

    private ContentResponse parsearRespuesta(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);
            String content = root.path("choices").get(0).path("message").path("content").asText();

            // Extract JSON substring between first '{' and last '}'
            int startIndex = content.indexOf('{');
            int endIndex = content.lastIndexOf('}');
            if (startIndex >= 0 && endIndex >= 0 && endIndex > startIndex) {
                content = content.substring(startIndex, endIndex + 1);
            }

            JsonNode jsonContent = objectMapper.readTree(content);

            return ContentResponse.builder()
                    .title(jsonContent.path("title").asText())
                    .introduction(jsonContent.path("introduction").asText())
                    .subtitle1(jsonContent.path("subtitle1").asText())
                    .content1(jsonContent.path("content1").asText())
                    .subtitle2(jsonContent.path("subtitle2").asText())
                    .content2(jsonContent.path("content2").asText())
                    .subtitle3(jsonContent.path("subtitle3").asText())
                    .content3(jsonContent.path("content3").asText())
                    .conclusion(jsonContent.path("conclusion").asText())
                    .metaDescription(jsonContent.path("metaDescription").asText())
                    .keywords(parseKeywords(jsonContent.path("keywords")))
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Error parseando respuesta IA", e);
        }
    }

    private List<String> parseKeywords(JsonNode keywordsNode) {
        List<String> keywords = new ArrayList<>();
        if (keywordsNode.isArray()) {
            for (JsonNode k : keywordsNode) {
                keywords.add(k.asText());
            }
        }
        return keywords;
    }

}
