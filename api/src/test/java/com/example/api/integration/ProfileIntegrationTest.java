package com.example.api.integration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("Profile Integration Tests")
class ProfileIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String createURL(String uri) {
        return "http://localhost:" + port + uri;
    }

    @Test
    @DisplayName("Profile experiences endpoint should return seeded data")
    void profileExperiencesEndpoint_ShouldReturnData() {
        ResponseEntity<Map[]> response = restTemplate.getForEntity(
                createURL("/api/profile/experiences"), Map[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().length > 0);
        assertNotNull(response.getBody()[0].get("company"));
    }

    @Test
    @DisplayName("Profile experience by id should return record and 404 for unknown id")
    void profileExperienceByIdEndpoint_ShouldHandleFoundAndMissing() {
        ResponseEntity<Map> found = restTemplate.getForEntity(
                createURL("/api/profile/experiences/1"), Map.class);
        ResponseEntity<Map> missing = restTemplate.getForEntity(
                createURL("/api/profile/experiences/9999"), Map.class);

        assertEquals(HttpStatus.OK, found.getStatusCode());
        assertNotNull(found.getBody());
        assertEquals(1, found.getBody().get("id"));
        assertEquals(HttpStatus.NOT_FOUND, missing.getStatusCode());
    }

    @Test
    @DisplayName("Profile education endpoint should return seeded data")
    void profileEducationEndpoint_ShouldReturnData() {
        ResponseEntity<Map[]> response = restTemplate.getForEntity(
                createURL("/api/profile/education"), Map[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().length > 0);
        assertNotNull(response.getBody()[0].get("institution"));
    }

    @Test
    @DisplayName("Profile education by id should return record and 404 for unknown id")
    void profileEducationByIdEndpoint_ShouldHandleFoundAndMissing() {
        ResponseEntity<Map> found = restTemplate.getForEntity(
                createURL("/api/profile/education/1"), Map.class);
        ResponseEntity<Map> missing = restTemplate.getForEntity(
                createURL("/api/profile/education/9999"), Map.class);

        assertEquals(HttpStatus.OK, found.getStatusCode());
        assertNotNull(found.getBody());
        assertEquals(1, found.getBody().get("id"));
        assertEquals(HttpStatus.NOT_FOUND, missing.getStatusCode());
    }

    @Test
    @DisplayName("Profile projects endpoints should return seeded data")
    void profileProjectsEndpoints_ShouldReturnData() {
        ResponseEntity<Map[]> allProjects = restTemplate.getForEntity(
                createURL("/api/profile/projects"), Map[].class);
        ResponseEntity<Map[]> featuredProjects = restTemplate.getForEntity(
                createURL("/api/profile/projects/featured"), Map[].class);
        ResponseEntity<Map> projectById = restTemplate.getForEntity(
                createURL("/api/profile/projects/1"), Map.class);
        ResponseEntity<Map> missingProject = restTemplate.getForEntity(
                createURL("/api/profile/projects/9999"), Map.class);

        assertEquals(HttpStatus.OK, allProjects.getStatusCode());
        assertNotNull(allProjects.getBody());
        assertTrue(allProjects.getBody().length > 0);

        assertEquals(HttpStatus.OK, featuredProjects.getStatusCode());
        assertNotNull(featuredProjects.getBody());
        assertTrue(featuredProjects.getBody().length > 0);

        assertEquals(HttpStatus.OK, projectById.getStatusCode());
        assertNotNull(projectById.getBody());
        assertEquals(1, projectById.getBody().get("id"));

        assertEquals(HttpStatus.NOT_FOUND, missingProject.getStatusCode());
    }

    @Test
    @DisplayName("Profile info and skills endpoints should return data")
    void profileInfoAndSkillsEndpoints_ShouldReturnData() {
        ResponseEntity<Map> info = restTemplate.getForEntity(
                createURL("/api/profile/info"), Map.class);
        ResponseEntity<Map> skills = restTemplate.getForEntity(
                createURL("/api/profile/skills"), Map.class);
        ResponseEntity<String[]> skillList = restTemplate.getForEntity(
                createURL("/api/profile/skills/list"), String[].class);

        assertEquals(HttpStatus.OK, info.getStatusCode());
        assertNotNull(info.getBody());
        assertEquals("Nathan Hu", info.getBody().get("name"));

        assertEquals(HttpStatus.OK, skills.getStatusCode());
        assertNotNull(skills.getBody());
        assertNotNull(skills.getBody().get("technicalSkills"));

        assertEquals(HttpStatus.OK, skillList.getStatusCode());
        assertNotNull(skillList.getBody());
        assertTrue(skillList.getBody().length > 0);
    }

    @Test
    @DisplayName("Profile photography endpoints should return data")
    void profilePhotographyEndpoints_ShouldReturnData() {
        ResponseEntity<Map[]> photos = restTemplate.getForEntity(
                createURL("/api/profile/photos"), Map[].class);
        ResponseEntity<Map[]> featuredPhotos = restTemplate.getForEntity(
                createURL("/api/profile/photos/featured"), Map[].class);
        ResponseEntity<Map> photoById = restTemplate.getForEntity(
                createURL("/api/profile/photos/1"), Map.class);
        ResponseEntity<Map> missingPhoto = restTemplate.getForEntity(
                createURL("/api/profile/photos/9999"), Map.class);

        assertEquals(HttpStatus.OK, photos.getStatusCode());
        assertNotNull(photos.getBody());
        assertTrue(photos.getBody().length > 0);
        assertNotNull(photos.getBody()[0].get("imagePath"));

        assertEquals(HttpStatus.OK, featuredPhotos.getStatusCode());
        assertNotNull(featuredPhotos.getBody());
        assertTrue(featuredPhotos.getBody().length > 0);

        assertEquals(HttpStatus.OK, photoById.getStatusCode());
        assertNotNull(photoById.getBody());
        assertEquals(1, photoById.getBody().get("id"));

        assertEquals(HttpStatus.NOT_FOUND, missingPhoto.getStatusCode());
    }
}
