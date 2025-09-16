package com.example.api.service;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {

    public String getGreeting(String name) {
        if (name == null || name.trim().isEmpty()) {
            return "Hello, Guest!";
        }
        return "Hello, " + name.trim() + "!";
    }

    public String getPersonalizedMessage(String name) {
        String greeting = getGreeting(name);
        return greeting + " Welcome to my personal website.";
    }

    public boolean isValidName(String name) {
        return name != null && !name.trim().isEmpty() && name.length() <= 50;
    }
}