package com.example.api.controller;

import com.example.api.service.GreetingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GreetingController.class)
@DisplayName("GreetingController Unit Tests")
class GreetingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GreetingService greetingService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/greeting should return greeting message")
    void greeting_WithValidName_ReturnsGreetingMessage() throws Exception {
        // Given
        String name = "John";
        String expectedMessage = "Hello, John! Welcome to my personal website.";
        when(greetingService.isValidName(name)).thenReturn(true);
        when(greetingService.getPersonalizedMessage(name)).thenReturn(expectedMessage);

        // When & Then
        mockMvc.perform(get("/api/greeting").param("name", name))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.message").value(expectedMessage));

        verify(greetingService).isValidName(name);
        verify(greetingService).getPersonalizedMessage(name);
    }

    @Test
    @DisplayName("GET /api/greeting without name should use default")
    void greeting_WithoutName_UsesDefault() throws Exception {
        // Given
        String expectedMessage = "Hello, Guest! Welcome to my personal website.";
        when(greetingService.getPersonalizedMessage("")).thenReturn(expectedMessage);

        // When & Then
        mockMvc.perform(get("/api/greeting"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.message").value(expectedMessage));

        verify(greetingService).getPersonalizedMessage("");
    }

    @Test
    @DisplayName("GET /api/greeting with invalid name should return error")
    void greeting_WithInvalidName_ReturnsError() throws Exception {
        // Given
        String invalidName = "A".repeat(51); // 51 characters
        when(greetingService.isValidName(invalidName)).thenReturn(false);

        // When & Then
        mockMvc.perform(get("/api/greeting").param("name", invalidName))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.error").value("Invalid name provided"));

        verify(greetingService).isValidName(invalidName);
        verify(greetingService, never()).getPersonalizedMessage(anyString());
    }

    @Test
    @DisplayName("POST /api/greeting should return greeting message")
    void postGreeting_WithValidName_ReturnsGreetingMessage() throws Exception {
        // Given
        String name = "Alice";
        String expectedMessage = "Hello, Alice! Welcome to my personal website.";
        Map<String, String> request = new HashMap<>();
        request.put("name", name);

        when(greetingService.isValidName(name)).thenReturn(true);
        when(greetingService.getPersonalizedMessage(name)).thenReturn(expectedMessage);

        // When & Then
        mockMvc.perform(post("/api/greeting")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.message").value(expectedMessage));

        verify(greetingService).isValidName(name);
        verify(greetingService).getPersonalizedMessage(name);
    }

    @Test
    @DisplayName("POST /api/greeting with null name should use default")
    void postGreeting_WithNullName_UsesDefault() throws Exception {
        // Given
        Map<String, String> request = new HashMap<>();
        request.put("name", null);
        String expectedMessage = "Hello, Guest! Welcome to my personal website.";

        when(greetingService.getPersonalizedMessage(null)).thenReturn(expectedMessage);

        // When & Then
        mockMvc.perform(post("/api/greeting")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.message").value(expectedMessage));

        verify(greetingService).getPersonalizedMessage(null);
    }

    @Test
    @DisplayName("POST /api/greeting with invalid name should return error")
    void postGreeting_WithInvalidName_ReturnsError() throws Exception {
        // Given
        String invalidName = "A".repeat(51); // 51 characters
        Map<String, String> request = new HashMap<>();
        request.put("name", invalidName);

        when(greetingService.isValidName(invalidName)).thenReturn(false);

        // When & Then
        mockMvc.perform(post("/api/greeting")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.error").value("Invalid name provided"));

        verify(greetingService).isValidName(invalidName);
        verify(greetingService, never()).getPersonalizedMessage(anyString());
    }

    @Test
    @DisplayName("POST /api/greeting with empty request body should handle gracefully")
    void postGreeting_WithEmptyRequestBody_HandlesGracefully() throws Exception {
        // Given
        Map<String, String> request = new HashMap<>();
        String expectedMessage = "Hello, Guest! Welcome to my personal website.";

        when(greetingService.getPersonalizedMessage(null)).thenReturn(expectedMessage);

        // When & Then
        mockMvc.perform(post("/api/greeting")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.message").value(expectedMessage));

        verify(greetingService).getPersonalizedMessage(null);
    }

    @Test
    @DisplayName("CORS headers should be present")
    void greeting_ShouldHaveCorsHeaders() throws Exception {
        // Given
        String expectedMessage = "Hello, Guest! Welcome to my personal website.";
        when(greetingService.getPersonalizedMessage("")).thenReturn(expectedMessage);

        // When & Then
        mockMvc.perform(get("/api/greeting")
                        .header("Origin", "http://localhost:3000"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"));
    }
}