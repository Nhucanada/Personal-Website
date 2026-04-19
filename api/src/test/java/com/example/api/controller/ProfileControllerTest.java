package com.example.api.controller;

import com.example.api.model.PhotographyPhoto;
import com.example.api.service.ProfileService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProfileController.class)
@DisplayName("ProfileController Unit Tests")
class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileService profileService;

    private PhotographyPhoto buildPhoto(int id, boolean featured) {
        return new PhotographyPhoto(
                id,
                "Photo " + id,
                "Montreal",
                "Placeholder",
                "desc",
                "/photos/placeholders/default-placeholder.jpg",
                featured,
                List.of("film")
        );
    }

    @Test
    @DisplayName("GET /api/profile/photos should return photo list")
    void getPhotos_ShouldReturnPhotoList() throws Exception {
        when(profileService.getPhotographyPhotos())
                .thenReturn(List.of(buildPhoto(1, true), buildPhoto(2, false)));

        mockMvc.perform(get("/api/profile/photos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));
    }

    @Test
    @DisplayName("GET /api/profile/photos should return 500 when service fails")
    void getPhotos_WhenServiceThrows_ShouldReturn500() throws Exception {
        when(profileService.getPhotographyPhotos())
                .thenThrow(new IOException("read failure"));

        mockMvc.perform(get("/api/profile/photos"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    @DisplayName("GET /api/profile/photos/featured should return featured list")
    void getFeaturedPhotos_ShouldReturnFeaturedList() throws Exception {
        when(profileService.getFeaturedPhotographyPhotos())
                .thenReturn(List.of(buildPhoto(1, true)));

        mockMvc.perform(get("/api/profile/photos/featured"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].featured").value(true));
    }

    @Test
    @DisplayName("GET /api/profile/photos/{id} should return photo when found")
    void getPhotoById_WhenFound_ShouldReturnPhoto() throws Exception {
        when(profileService.getPhotographyPhotoById(1))
                .thenReturn(buildPhoto(1, true));

        mockMvc.perform(get("/api/profile/photos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    @DisplayName("GET /api/profile/photos/{id} should return 404 when not found")
    void getPhotoById_WhenMissing_ShouldReturn404() throws Exception {
        when(profileService.getPhotographyPhotoById(999))
                .thenReturn(null);

        mockMvc.perform(get("/api/profile/photos/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /api/profile/photos/{id} should return 500 when service fails")
    void getPhotoById_WhenServiceThrows_ShouldReturn500() throws Exception {
        when(profileService.getPhotographyPhotoById(1))
                .thenThrow(new IOException("read failure"));

        mockMvc.perform(get("/api/profile/photos/1"))
                .andExpect(status().isInternalServerError());
    }
}
