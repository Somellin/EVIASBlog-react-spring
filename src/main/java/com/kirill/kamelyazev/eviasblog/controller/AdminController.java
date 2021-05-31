package com.kirill.kamelyazev.eviasblog.controller;

import com.kirill.kamelyazev.eviasblog.exception.ResourceNotFoundException;
import com.kirill.kamelyazev.eviasblog.model.User;
import com.kirill.kamelyazev.eviasblog.repository.RoleRepository;
import com.kirill.kamelyazev.eviasblog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class AdminController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    //get all users
    @GetMapping("/users")
    public List<User> getAllEmployees() {
        return userRepository.findAll();
    }

    //delete user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }
}
