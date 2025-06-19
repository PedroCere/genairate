package com.geneairate.templateservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.geneairate.templateservice.dto.PromptStyleTemplateRequest;
import com.geneairate.templateservice.model.PromptStyleTemplate;
import com.geneairate.templateservice.service.TemplateService;
import com.geneairate.templateservice.util.TestDataUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TemplateController.class)
public class TemplateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TemplateService templateService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setup() {}

    @Test
    void getTemplate_returnsTemplate() throws Exception {
        var template = TestDataUtil.sampleTemplate(1L, TestDataUtil.DEFAULT_USER_ID, false);
        when(templateService.getTemplateById(1L)).thenReturn(template);

        mockMvc.perform(get("/api/v1/templates/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void getTemplate_notFound_returns404() throws Exception {
        when(templateService.getTemplateById(999L))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, "Template not found"));


        mockMvc.perform(get("/api/v1/templates/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getByUser_returnsTemplateList() throws Exception {
        List<PromptStyleTemplate> templates = TestDataUtil.sampleTemplateList(TestDataUtil.DEFAULT_USER_ID);
        when(templateService.getTemplatesByUser(TestDataUtil.DEFAULT_USER_ID)).thenReturn(templates);

        mockMvc.perform(get("/api/v1/templates/user/" + TestDataUtil.DEFAULT_USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].userId").value(TestDataUtil.DEFAULT_USER_ID));
    }

    @Test
    void create_returnsId() throws Exception {
        var request = TestDataUtil.sampleRequest();
        when(templateService.createTemplate(eq(request), eq(TestDataUtil.DEFAULT_USER_ID))).thenReturn(1L);

        mockMvc.perform(post("/api/v1/templates/" + TestDataUtil.DEFAULT_USER_ID)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }

    @Test
    void update_successful() throws Exception {
        var request = TestDataUtil.sampleRequest();

        mockMvc.perform(put("/api/v1/templates/1/" + TestDataUtil.DEFAULT_USER_ID)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent());

        verify(templateService).updateTemplate(eq(1L), eq(request), eq(TestDataUtil.DEFAULT_USER_ID));
    }

    @Test
    void update_unauthorized_returns403() throws Exception {
        var request = TestDataUtil.sampleRequest();
        doThrow(new ResponseStatusException(HttpStatus.FORBIDDEN, "No authorized"))
                .when(templateService).updateTemplate(eq(1L), eq(request), eq(TestDataUtil.DEFAULT_USER_ID));

        mockMvc.perform(put("/api/v1/templates/1/" + TestDataUtil.DEFAULT_USER_ID)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }


    @Test
    void delete_successful() throws Exception {
        mockMvc.perform(delete("/api/v1/templates/1/" + TestDataUtil.DEFAULT_USER_ID))
                .andExpect(status().isNoContent());

        verify(templateService).deleteTemplate(eq(1L), eq(TestDataUtil.DEFAULT_USER_ID));
    }

    @Test
    void delete_unauthorized_returns403() throws Exception {
        doThrow(new ResponseStatusException(HttpStatus.FORBIDDEN,"No authorized"))
                .when(templateService).deleteTemplate(eq(1L), eq(TestDataUtil.DEFAULT_USER_ID));

        mockMvc.perform(delete("/api/v1/templates/1/" + TestDataUtil.DEFAULT_USER_ID))
                .andExpect(status().isForbidden());
    }

    @Test
    void getDefaultTemplate_successful() throws Exception {
        var template = TestDataUtil.sampleTemplate(1L, TestDataUtil.DEFAULT_USER_ID, true);
        when(templateService.getDefaultTemplateForUser(TestDataUtil.DEFAULT_USER_ID)).thenReturn(template);

        mockMvc.perform(get("/api/v1/templates/default/" + TestDataUtil.DEFAULT_USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isDefault").value(true));
    }

    @Test
    void getDefaultTemplate_notFound_returns404() throws Exception {
        when(templateService.getDefaultTemplateForUser(TestDataUtil.DEFAULT_USER_ID))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND,"Default template not found"));

        mockMvc.perform(get("/api/v1/templates/default/" + TestDataUtil.DEFAULT_USER_ID))
                .andExpect(status().isNotFound());
    }

}
