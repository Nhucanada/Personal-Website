package com.example.api.model;

import java.util.List;
import java.util.Map;

/**
 * Model class representing technical skills and proficiency levels.
 */
public class Skills {
    private List<String> technicalSkills;
    private Map<String, List<String>> categories;
    private Map<String, List<String>> proficiencyLevels;

    // Default constructor
    public Skills() {}

    // Constructor with all fields
    public Skills(List<String> technicalSkills, Map<String, List<String>> categories,
                 Map<String, List<String>> proficiencyLevels) {
        this.technicalSkills = technicalSkills;
        this.categories = categories;
        this.proficiencyLevels = proficiencyLevels;
    }

    // Getters and setters
    public List<String> getTechnicalSkills() {
        return technicalSkills;
    }

    public void setTechnicalSkills(List<String> technicalSkills) {
        this.technicalSkills = technicalSkills;
    }

    public Map<String, List<String>> getCategories() {
        return categories;
    }

    public void setCategories(Map<String, List<String>> categories) {
        this.categories = categories;
    }

    public Map<String, List<String>> getProficiencyLevels() {
        return proficiencyLevels;
    }

    public void setProficiencyLevels(Map<String, List<String>> proficiencyLevels) {
        this.proficiencyLevels = proficiencyLevels;
    }
}