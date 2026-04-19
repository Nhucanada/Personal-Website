package com.example.api.model;

import java.util.List;

/**
 * Model class representing a photography portfolio item.
 */
public class PhotographyPhoto {
    private int id;
    private String title;
    private String location;
    private String capturedOn;
    private String description;
    private String imagePath;
    private boolean featured;
    private List<String> tags;

    public PhotographyPhoto() {}

    public PhotographyPhoto(
            int id,
            String title,
            String location,
            String capturedOn,
            String description,
            String imagePath,
            boolean featured,
            List<String> tags
    ) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.capturedOn = capturedOn;
        this.description = description;
        this.imagePath = imagePath;
        this.featured = featured;
        this.tags = tags;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getCapturedOn() {
        return capturedOn;
    }

    public void setCapturedOn(String capturedOn) {
        this.capturedOn = capturedOn;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
