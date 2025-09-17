package com.example.api.controller;

import com.example.api.model.Experience;
import com.example.api.model.Education;
import com.example.api.model.Project;
import com.example.api.model.PersonalInfo;
import com.example.api.model.Skills;
import com.example.api.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/**
 * REST Controller for profile data endpoints.
 */
@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    /**
     * Get all work experiences.
     * @return List of experiences
     */
    @GetMapping("/experiences")
    public ResponseEntity<List<Experience>> getExperiences() {
        try {
            List<Experience> experiences = profileService.getExperiences();
            return ResponseEntity.ok(experiences);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get experience by ID.
     * @param id Experience ID
     * @return Experience object or 404 if not found
     */
    @GetMapping("/experiences/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable int id) {
        try {
            Experience experience = profileService.getExperienceById(id);
            if (experience != null) {
                return ResponseEntity.ok(experience);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get all education entries.
     * @return List of education entries
     */
    @GetMapping("/education")
    public ResponseEntity<List<Education>> getEducation() {
        try {
            List<Education> education = profileService.getEducation();
            return ResponseEntity.ok(education);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get education by ID.
     * @param id Education ID
     * @return Education object or 404 if not found
     */
    @GetMapping("/education/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable int id) {
        try {
            Education education = profileService.getEducationById(id);
            if (education != null) {
                return ResponseEntity.ok(education);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get all projects.
     * @return List of projects
     */
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects() {
        try {
            List<Project> projects = profileService.getProjects();
            return ResponseEntity.ok(projects);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get only featured projects.
     * @return List of featured projects
     */
    @GetMapping("/projects/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        try {
            List<Project> projects = profileService.getFeaturedProjects();
            return ResponseEntity.ok(projects);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get project by ID.
     * @param id Project ID
     * @return Project object or 404 if not found
     */
    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable int id) {
        try {
            Project project = profileService.getProjectById(id);
            if (project != null) {
                return ResponseEntity.ok(project);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get personal information and contact details.
     * @return Personal information object
     */
    @GetMapping("/info")
    public ResponseEntity<PersonalInfo> getPersonalInfo() {
        try {
            PersonalInfo info = profileService.getPersonalInfo();
            return ResponseEntity.ok(info);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get skills and technical competencies.
     * @return Skills object
     */
    @GetMapping("/skills")
    public ResponseEntity<Skills> getSkills() {
        try {
            Skills skills = profileService.getSkills();
            return ResponseEntity.ok(skills);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get basic technical skills list only.
     * @return List of technical skills
     */
    @GetMapping("/skills/list")
    public ResponseEntity<List<String>> getTechnicalSkillsList() {
        try {
            Skills skills = profileService.getSkills();
            return ResponseEntity.ok(skills.getTechnicalSkills());
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}