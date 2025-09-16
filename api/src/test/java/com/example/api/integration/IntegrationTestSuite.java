package com.example.api.integration;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("Integration Test Suite")
class IntegrationTestSuite {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String createURL(String uri) {
        return "http://localhost:" + port + uri;
    }

    @Test
    @DisplayName("Health endpoint integration test")
    void healthEndpoint_ShouldReturnHealthStatus() {
        // When
        ResponseEntity<Map> response = restTemplate.getForEntity(
                createURL("/api/health"), Map.class);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("UP", response.getBody().get("status"));
        assertEquals("Personal Website API", response.getBody().get("service"));
    }

    @Test
    @DisplayName("Status endpoint integration test")
    void statusEndpoint_ShouldReturnStatusInformation() {
        // When
        ResponseEntity<Map> response = restTemplate.getForEntity(
                createURL("/api/status"), Map.class);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("RUNNING", response.getBody().get("status"));
        assertEquals("1.0.0", response.getBody().get("version"));
        assertNotNull(response.getBody().get("timestamp"));
    }

    @Test
    @DisplayName("Greeting endpoint integration test")
    void greetingEndpoint_ShouldReturnGreetingMessage() {
        // When
        ResponseEntity<Map> response = restTemplate.getForEntity(
                createURL("/api/greeting?name=IntegrationTest"), Map.class);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Hello, IntegrationTest! Welcome to my personal website.",
                     response.getBody().get("message"));
    }

    @Test
    @DisplayName("Application context loads successfully")
    void contextLoads() {
        // This test verifies that the application context loads without errors
        // The presence of this test ensures the application starts correctly
        assertTrue(true);
    }
}