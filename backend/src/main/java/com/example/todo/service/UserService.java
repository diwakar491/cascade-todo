package com.example.todo.service;

import com.example.todo.entity.User;
import com.example.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public Optional<User> getUserById(@NonNull Long id) {
        return userRepository.findById(id);
    }
    
    public User updateUsername(@NonNull Long userId, String newUsername) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Check if username is already taken by another user
            if (userRepository.existsByUsername(newUsername) && !user.getUsername().equals(newUsername)) {
                throw new RuntimeException("Username is already taken!");
            }
            
            user.setUsername(newUsername);
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found");
    }
    
    public User updateEmail(@NonNull Long userId, String newEmail) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Check if email is already taken by another user
            if (userRepository.existsByEmail(newEmail) && !user.getEmail().equals(newEmail)) {
                throw new RuntimeException("Email is already in use!");
            }
            
            user.setEmail(newEmail);
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found");
    }
    
    public User updatePassword(@NonNull Long userId, String currentPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Verify current password
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                throw new RuntimeException("Current password is incorrect");
            }
            
            user.setPassword(passwordEncoder.encode(newPassword));
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found");
    }
    
    public User getUserProfile(@NonNull Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Create a safe user object without password
            User safeUser = new User();
            safeUser.setId(user.getId());
            safeUser.setUsername(user.getUsername());
            safeUser.setEmail(user.getEmail());
            safeUser.setCreatedAt(user.getCreatedAt());
            safeUser.setRole(user.getRole());
            return safeUser;
        }
        throw new RuntimeException("User not found");
    }
}
