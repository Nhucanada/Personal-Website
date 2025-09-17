package com.example.api.service;

import com.example.api.model.Experience;
import com.example.api.model.Education;
import com.example.api.model.Project;
import com.example.api.model.PersonalInfo;
import com.example.api.model.Skills;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * Service class for loading profile data from JSON files.
 */
@Service
public class ProfileService {

    private final ObjectMapper objectMapper;

    public ProfileService() {
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Load all work experiences from JSON file.
     * @return List of Experience objects
     * @throws IOException if the file cannot be read
     */
    public List<Experience> getExperiences() throws IOException {
        InputStream inputStream = new ClassPathResource("data/experiences.json").getInputStream();
        return objectMapper.readValue(inputStream, new TypeReference<List<Experience>>() {});
    }

    /**
     * Load all education entries from JSON file.
     * @return List of Education objects
     * @throws IOException if the file cannot be read
     */
    public List<Education> getEducation() throws IOException {
        InputStream inputStream = new ClassPathResource("data/education.json").getInputStream();
        return objectMapper.readValue(inputStream, new TypeReference<List<Education>>() {});
    }

    /**
     * Load all projects from JSON file.
     * @return List of Project objects
     * @throws IOException if the file cannot be read
     */
    public List<Project> getProjects() throws IOException {
        InputStream inputStream = new ClassPathResource("data/projects.json").getInputStream();
        return objectMapper.readValue(inputStream, new TypeReference<List<Project>>() {});
    }

    /**
     * Load personal information from JSON file.
     * @return PersonalInfo object
     * @throws IOException if the file cannot be read
     */
    public PersonalInfo getPersonalInfo() throws IOException {
        InputStream inputStream = new ClassPathResource("data/personal-info.json").getInputStream();
        return objectMapper.readValue(inputStream, PersonalInfo.class);
    }

    /**
     * Load skills information from JSON file.
     * @return Skills object
     * @throws IOException if the file cannot be read
     */
    public Skills getSkills() throws IOException {
        InputStream inputStream = new ClassPathResource("data/skills.json").getInputStream();
        return objectMapper.readValue(inputStream, Skills.class);
    }

    /**
     * Get experience by ID.
     * @param id The experience ID
     * @return Experience object or null if not found
     * @throws IOException if the file cannot be read
     */
    public Experience getExperienceById(int id) throws IOException {
        List<Experience> experiences = getExperiences();
        return experiences.stream()
                .filter(exp -> exp.getId() == id)
                .findFirst()
                .orElse(null);
    }

    /**
     * Get education by ID.
     * @param id The education ID
     * @return Education object or null if not found
     * @throws IOException if the file cannot be read
     */
    public Education getEducationById(int id) throws IOException {
        List<Education> education = getEducation();
        return education.stream()
                .filter(edu -> edu.getId() == id)
                .findFirst()
                .orElse(null);
    }

    /**
     * Get project by ID.
     * @param id The project ID
     * @return Project object or null if not found
     * @throws IOException if the file cannot be read
     */
    public Project getProjectById(int id) throws IOException {
        List<Project> projects = getProjects();
        return projects.stream()
                .filter(proj -> proj.getId() == id)
                .findFirst()
                .orElse(null);
    }

    /**
     * Get only featured projects.
     * @return List of featured Project objects
     * @throws IOException if the file cannot be read
     */
    public List<Project> getFeaturedProjects() throws IOException {
        List<Project> projects = getProjects();
        return projects.stream()
                .filter(Project::isFeatured)
                .toList();
    }
}