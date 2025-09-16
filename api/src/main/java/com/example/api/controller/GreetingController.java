package com.example.api.controller;

import com.example.api.service.GreetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class GreetingController {

    @Autowired
    private GreetingService greetingService;

    @GetMapping("/greeting")
    public ResponseEntity<Map<String, String>> greeting(@RequestParam(defaultValue = "") String name) {
        Map<String, String> response = new HashMap<>();

        if (!greetingService.isValidName(name) && !name.isEmpty()) {
            response.put("error", "Invalid name provided");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", greetingService.getPersonalizedMessage(name));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/greeting")
    public ResponseEntity<Map<String, String>> postGreeting(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        Map<String, String> response = new HashMap<>();

        if (!greetingService.isValidName(name) && name != null && !name.isEmpty()) {
            response.put("error", "Invalid name provided");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", greetingService.getPersonalizedMessage(name));
        return ResponseEntity.ok(response);
    }
}