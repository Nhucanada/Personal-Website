package com.example.api.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DisplayName("PhotographyPhoto Model Tests")
class PhotographyPhotoTest {

    @Test
    @DisplayName("Constructor should populate all fields")
    void constructor_ShouldPopulateAllFields() {
        List<String> tags = List.of("film", "street");
        PhotographyPhoto photo = new PhotographyPhoto(
                7,
                "Golden Hour",
                "Montreal",
                "2026-04-01",
                "Warm and moody frame",
                "/photos/street/golden-hour.jpg",
                true,
                tags
        );

        assertEquals(7, photo.getId());
        assertEquals("Golden Hour", photo.getTitle());
        assertEquals("Montreal", photo.getLocation());
        assertEquals("2026-04-01", photo.getCapturedOn());
        assertEquals("Warm and moody frame", photo.getDescription());
        assertEquals("/photos/street/golden-hour.jpg", photo.getImagePath());
        assertTrue(photo.isFeatured());
        assertEquals(tags, photo.getTags());
    }

    @Test
    @DisplayName("Setters should update fields")
    void setters_ShouldUpdateFields() {
        PhotographyPhoto photo = new PhotographyPhoto();
        List<String> tags = List.of("portrait");

        photo.setId(4);
        photo.setTitle("Quiet Portrait");
        photo.setLocation("Quebec");
        photo.setCapturedOn("2026-04-02");
        photo.setDescription("Soft editorial portrait");
        photo.setImagePath("/photos/portraits/quiet-portrait.jpg");
        photo.setFeatured(false);
        photo.setTags(tags);

        assertEquals(4, photo.getId());
        assertEquals("Quiet Portrait", photo.getTitle());
        assertEquals("Quebec", photo.getLocation());
        assertEquals("2026-04-02", photo.getCapturedOn());
        assertEquals("Soft editorial portrait", photo.getDescription());
        assertEquals("/photos/portraits/quiet-portrait.jpg", photo.getImagePath());
        assertFalse(photo.isFeatured());
        assertEquals(tags, photo.getTags());
    }
}
