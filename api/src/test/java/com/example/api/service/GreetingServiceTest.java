package com.example.api.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@DisplayName("GreetingService Unit Tests")
class GreetingServiceTest {

    private GreetingService greetingService;

    @BeforeEach
    void setUp() {
        greetingService = new GreetingService();
    }

    @Test
    @DisplayName("Should return default greeting for null name")
    void getGreeting_WithNullName_ReturnsDefaultGreeting() {
        // Given
        String name = null;

        // When
        String result = greetingService.getGreeting(name);

        // Then
        assertEquals("Hello, Guest!", result);
    }

    @Test
    @DisplayName("Should return default greeting for empty name")
    void getGreeting_WithEmptyName_ReturnsDefaultGreeting() {
        // Given
        String name = "";

        // When
        String result = greetingService.getGreeting(name);

        // Then
        assertEquals("Hello, Guest!", result);
    }

    @Test
    @DisplayName("Should return default greeting for whitespace-only name")
    void getGreeting_WithWhitespaceOnlyName_ReturnsDefaultGreeting() {
        // Given
        String name = "   ";

        // When
        String result = greetingService.getGreeting(name);

        // Then
        assertEquals("Hello, Guest!", result);
    }

    @Test
    @DisplayName("Should return personalized greeting for valid name")
    void getGreeting_WithValidName_ReturnsPersonalizedGreeting() {
        // Given
        String name = "John";

        // When
        String result = greetingService.getGreeting(name);

        // Then
        assertEquals("Hello, John!", result);
    }

    @Test
    @DisplayName("Should trim whitespace from name")
    void getGreeting_WithNameWithWhitespace_TrimsWhitespace() {
        // Given
        String name = "  Alice  ";

        // When
        String result = greetingService.getGreeting(name);

        // Then
        assertEquals("Hello, Alice!", result);
    }

    @Test
    @DisplayName("Should return personalized message for null name")
    void getPersonalizedMessage_WithNullName_ReturnsDefaultMessage() {
        // Given
        String name = null;

        // When
        String result = greetingService.getPersonalizedMessage(name);

        // Then
        assertEquals("Hello, Guest! Welcome to my personal website.", result);
    }

    @Test
    @DisplayName("Should return personalized message for valid name")
    void getPersonalizedMessage_WithValidName_ReturnsPersonalizedMessage() {
        // Given
        String name = "Bob";

        // When
        String result = greetingService.getPersonalizedMessage(name);

        // Then
        assertEquals("Hello, Bob! Welcome to my personal website.", result);
    }

    @Test
    @DisplayName("Should return false for null name validation")
    void isValidName_WithNullName_ReturnsFalse() {
        // Given
        String name = null;

        // When
        boolean result = greetingService.isValidName(name);

        // Then
        assertFalse(result);
    }

    @Test
    @DisplayName("Should return false for empty name validation")
    void isValidName_WithEmptyName_ReturnsFalse() {
        // Given
        String name = "";

        // When
        boolean result = greetingService.isValidName(name);

        // Then
        assertFalse(result);
    }

    @Test
    @DisplayName("Should return false for whitespace-only name validation")
    void isValidName_WithWhitespaceOnlyName_ReturnsFalse() {
        // Given
        String name = "   ";

        // When
        boolean result = greetingService.isValidName(name);

        // Then
        assertFalse(result);
    }

    @Test
    @DisplayName("Should return true for valid name")
    void isValidName_WithValidName_ReturnsTrue() {
        // Given
        String name = "Charlie";

        // When
        boolean result = greetingService.isValidName(name);

        // Then
        assertTrue(result);
    }

    @Test
    @DisplayName("Should return false for name exceeding max length")
    void isValidName_WithNameExceedingMaxLength_ReturnsFalse() {
        // Given
        String name = "A".repeat(51); // 51 characters

        // When
        boolean result = greetingService.isValidName(name);

        // Then
        assertFalse(result);
    }

    @Test
    @DisplayName("Should return true for name at max length")
    void isValidName_WithNameAtMaxLength_ReturnsTrue() {
        // Given
        String name = "A".repeat(50); // 50 characters

        // When
        boolean result = greetingService.isValidName(name);

        // Then
        assertTrue(result);
    }

    @ParameterizedTest
    @ValueSource(strings = {"John", "Alice", "Bob", "Charlie", "Diana"})
    @DisplayName("Should return valid greetings for multiple names")
    void getGreeting_WithMultipleValidNames_ReturnsCorrectGreetings(String name) {
        // When
        String result = greetingService.getGreeting(name);

        // Then
        assertEquals("Hello, " + name + "!", result);
    }
}