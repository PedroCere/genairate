package com.geneairate.blogcontentservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.geneairate.blogcontentservice.dto.*;
import com.geneairate.blogcontentservice.service.BlogContentService;
import com.geneairate.blogcontentservice.util.TestDataFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BlogContentController.class)
public class BlogContentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BlogContentService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getBlogsByUser_returnsBlogs() throws Exception {
        when(service.getByUserId(1L)).thenReturn(List.of(TestDataFactory.defaultContentResponse()));

        mockMvc.perform(get("/content/user/1/blogs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void generate_returnsContent() throws Exception {
        ContentRequest request = TestDataFactory.defaultContentRequest();
        ContentResponse response = TestDataFactory.defaultContentResponse();

        when(service.generateContent(any())).thenReturn(response);

        mockMvc.perform(post("/content/generate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(response.getTitle()));
    }

    @Test
    void rewrite_returnsModifiedContent() throws Exception {
        ModifyContentRequest request = new ModifyContentRequest(1L, "reescribilo en tono casual");
        ContentResponse response = TestDataFactory.defaultContentResponse();

        when(service.reescribirTexto(any())).thenReturn(response);

        mockMvc.perform(put("/content/rewrite")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(response.getTitle()));
    }

    @Test
    void summarize_returnsSummary() throws Exception {
        ContentRequest request = TestDataFactory.defaultContentRequest();
        ContentResponse response = TestDataFactory.defaultContentResponse();

        when(service.resumirContenido(any())).thenReturn(response);

        mockMvc.perform(post("/content/summarize")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void correct_returnsCorrectedText() throws Exception {
        ContentRequest request = TestDataFactory.defaultContentRequest();
        ContentResponse response = TestDataFactory.defaultContentResponse();

        when(service.corrigirTexto(any())).thenReturn(response);

        mockMvc.perform(post("/content/correct")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void translate_returnsTranslatedContent() throws Exception {
        TranslateRequest request = new TranslateRequest(1L, "en");
        ContentResponse response = TestDataFactory.defaultContentResponse();

        when(service.traducirContenido(any())).thenReturn(response);

        mockMvc.perform(put("/content/translate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void getById_returnsContent() throws Exception {
        ContentResponse response = TestDataFactory.defaultContentResponse();
        when(service.obtenerPorId(1L)).thenReturn(response);

        mockMvc.perform(get("/content/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(response.getTitle()));
    }

    @Test
    void save_createsOrUpdates() throws Exception {
        ContentResponse dto = TestDataFactory.defaultContentResponse();

        mockMvc.perform(post("/content/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());

        verify(service).guardarArticulo(refEq(dto));
    }

    @Test
    void deleteById_ok() throws Exception {
        mockMvc.perform(delete("/content/1"))
                .andExpect(status().isOk());

        verify(service).eliminarPorId(1L);
    }

    @Test
    void recent_returnsTop3() throws Exception {
        when(service.obtenerRecientes()).thenReturn(List.of(TestDataFactory.defaultContentResponse()));

        mockMvc.perform(get("/content/recent"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void getAll_returnsAll() throws Exception {
        when(service.getAll()).thenReturn(List.of(TestDataFactory.defaultContentResponse()));

        mockMvc.perform(get("/content/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void patch_updatesPartially() throws Exception {
        BlogArticlePatchRequest patch = BlogArticlePatchRequest.builder().title("Nuevo título").build();

        mockMvc.perform(patch("/content/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(patch)))
                .andExpect(status().isNoContent());

        verify(service).partialUpdate(eq(1L), any());
    }
}
