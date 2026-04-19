package com.example.api.service;

import com.example.api.model.PhotographyPhoto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DisplayName("ProfileService Tests")
class ProfileServiceTest {

    private ProfileService profileService;

    @BeforeEach
    void setUp() {
        profileService = new ProfileService();
    }

    @Test
    @DisplayName("Should load photography photos from JSON")
    void getPhotographyPhotos_ShouldReturnPhotos() throws IOException {
        List<PhotographyPhoto> photos = profileService.getPhotographyPhotos();

        assertFalse(photos.isEmpty());
        assertEquals("Quiet Morning Platform", photos.get(0).getTitle());
    }

    @Test
    @DisplayName("Should return only featured photography photos")
    void getFeaturedPhotographyPhotos_ShouldReturnFeaturedOnly() throws IOException {
        List<PhotographyPhoto> photos = profileService.getFeaturedPhotographyPhotos();

        assertFalse(photos.isEmpty());
        assertTrue(photos.stream().allMatch(PhotographyPhoto::isFeatured));
    }

    @Test
    @DisplayName("Should find photography photo by ID")
    void getPhotographyPhotoById_WithExistingId_ShouldReturnPhoto() throws IOException {
        PhotographyPhoto photo = profileService.getPhotographyPhotoById(1);

        assertNotNull(photo);
        assertEquals("Quiet Morning Platform", photo.getTitle());
    }

    @Test
    @DisplayName("Should return null for unknown photography photo ID")
    void getPhotographyPhotoById_WithUnknownId_ShouldReturnNull() throws IOException {
        PhotographyPhoto photo = profileService.getPhotographyPhotoById(9999);

        assertNull(photo);
    }
}
