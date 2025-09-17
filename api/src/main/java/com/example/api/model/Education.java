package com.example.api.model;

import java.util.List;

/**
 * Model class representing an education entry.
 */
public class Education {
    private int id;
    private String institution;
    private String degree;
    private String field;
    private String location;
    private String startDate;
    private String endDate;
    private String description;
    private List<String> relevantCourses;
    private List<String> achievements;
    private String gpa;

    // Default constructor
    public Education() {}

    // Constructor with all fields
    public Education(int id, String institution, String degree, String field,
                    String location, String startDate, String endDate,
                    String description, List<String> relevantCourses, List<String> achievements, String gpa) {
        this.id = id;
        this.institution = institution;
        this.degree = degree;
        this.field = field;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.relevantCourses = relevantCourses;
        this.achievements = achievements;
        this.gpa = gpa;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getRelevantCourses() {
        return relevantCourses;
    }

    public void setRelevantCourses(List<String> relevantCourses) {
        this.relevantCourses = relevantCourses;
    }

    public List<String> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<String> achievements) {
        this.achievements = achievements;
    }

    public String getGpa() {
        return gpa;
    }

    public void setGpa(String gpa) {
        this.gpa = gpa;
    }
}