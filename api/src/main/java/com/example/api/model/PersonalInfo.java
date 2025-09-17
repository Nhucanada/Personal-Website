package com.example.api.model;

import java.util.List;
import java.util.Map;

/**
 * Model class representing personal information and contact details.
 */
public class PersonalInfo {
    private String name;
    private String title;
    private String location;
    private String bio;
    private String description;
    private List<Language> languages;
    private Contact contact;

    // Default constructor
    public PersonalInfo() {}

    // Constructor with all fields
    public PersonalInfo(String name, String title, String location, String bio,
                       String description, List<Language> languages, Contact contact) {
        this.name = name;
        this.title = title;
        this.location = location;
        this.bio = bio;
        this.description = description;
        this.languages = languages;
        this.contact = contact;
    }

    // Inner class for Language
    public static class Language {
        private String language;
        private String proficiency;

        public Language() {}

        public Language(String language, String proficiency) {
            this.language = language;
            this.proficiency = proficiency;
        }

        public String getLanguage() {
            return language;
        }

        public void setLanguage(String language) {
            this.language = language;
        }

        public String getProficiency() {
            return proficiency;
        }

        public void setProficiency(String proficiency) {
            this.proficiency = proficiency;
        }
    }

    // Inner class for Contact
    public static class Contact {
        private String email;
        private String mcgillEmail;
        private String linkedin;
        private String github;
        private String location;

        public Contact() {}

        public Contact(String email, String mcgillEmail, String linkedin, String github, String location) {
            this.email = email;
            this.mcgillEmail = mcgillEmail;
            this.linkedin = linkedin;
            this.github = github;
            this.location = location;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getMcgillEmail() {
            return mcgillEmail;
        }

        public void setMcgillEmail(String mcgillEmail) {
            this.mcgillEmail = mcgillEmail;
        }

        public String getLinkedin() {
            return linkedin;
        }

        public void setLinkedin(String linkedin) {
            this.linkedin = linkedin;
        }

        public String getGithub() {
            return github;
        }

        public void setGithub(String github) {
            this.github = github;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }
}