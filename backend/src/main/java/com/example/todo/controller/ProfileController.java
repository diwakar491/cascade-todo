package com.example.todo.controller;

import com.example.todo.entity.User;
import com.example.todo.security.services.UserDetailsImpl;
import com.example.todo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal @NonNull UserDetailsImpl userDetails) {
        try {
            User user = userService.getUserProfile((Long) userDetails.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("createdAt", user.getCreatedAt());
            response.put("role", user.getRole());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/username")
    public ResponseEntity<?> updateUsername(@Valid @RequestBody UsernameUpdateRequest request, @AuthenticationPrincipal @NonNull UserDetailsImpl userDetails) {
        try {
            User updatedUser = userService.updateUsername((Long) userDetails.getId(), request.getUsername());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Username updated successfully");
            response.put("username", updatedUser.getUsername());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/email")
    public ResponseEntity<?> updateEmail(@Valid @RequestBody EmailUpdateRequest request, @AuthenticationPrincipal @NonNull UserDetailsImpl userDetails) {
        try {
            User updatedUser = userService.updateEmail((Long) userDetails.getId(), request.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Email updated successfully");
            response.put("email", updatedUser.getEmail());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody PasswordUpdateRequest request, @AuthenticationPrincipal @NonNull UserDetailsImpl userDetails) {
        try {
            userService.updatePassword((Long) userDetails.getId(), request.getCurrentPassword(), request.getNewPassword());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Password updated successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    public static class UsernameUpdateRequest {
        private String username;
        
        public String getUsername() {
            return username;
        }
        
        public void setUsername(String username) {
            this.username = username;
        }
    }
    
    public static class EmailUpdateRequest {
        private String email;
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
    }
    
    public static class PasswordUpdateRequest {
        private String currentPassword;
        private String newPassword;
        
        public String getCurrentPassword() {
            return currentPassword;
        }
        
        public void setCurrentPassword(String currentPassword) {
            this.currentPassword = currentPassword;
        }
        
        public String getNewPassword() {
            return newPassword;
        }
        
        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }
}
