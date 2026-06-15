package com.csms.service;

import com.csms.dto.*;
import com.csms.entity.User;
import com.csms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // Register new customer
    public UserDTO register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // plain text for now; use BCrypt in production
        user.setPhone(req.getPhone());
        user.setRole(User.Role.CUSTOMER);
        return toDTO(userRepository.save(user));
    }

    // Login
    public UserDTO login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getPassword().equals(req.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return toDTO(user);
    }

    // Get all customers (admin)
    public List<UserDTO> getAllCustomers() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.CUSTOMER)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Get user by ID
    public UserDTO getUserById(Long id) {
        return toDTO(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found")));
    }

    // Update user
    public UserDTO updateUser(Long id, RegisterRequest req) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        if (req.getPassword() != null && !req.getPassword().isBlank()) {
            user.setPassword(req.getPassword());
        }
        return toDTO(userRepository.save(user));
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private UserDTO toDTO(User u) {
        UserDTO dto = new UserDTO();
        dto.setId(u.getId());
        dto.setName(u.getName());
        dto.setEmail(u.getEmail());
        dto.setPhone(u.getPhone());
        dto.setRole(u.getRole());
        return dto;
    }
}
