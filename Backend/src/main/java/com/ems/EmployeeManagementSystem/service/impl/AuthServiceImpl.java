package com.ems.EmployeeManagementSystem.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.EmployeeManagementSystem.dto.request.LoginRequestDTO;
import com.ems.EmployeeManagementSystem.dto.request.RegisterRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.JwtResponseDTO;
import com.ems.EmployeeManagementSystem.entity.User;
import com.ems.EmployeeManagementSystem.exception.DuplicateResourceException;
import com.ems.EmployeeManagementSystem.repository.UserRepository;
import com.ems.EmployeeManagementSystem.security.CustomUserDetails;
import com.ems.EmployeeManagementSystem.security.JwtUtil;
import com.ems.EmployeeManagementSystem.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    /**
     * Register User
     */
    @Override
    public String register(RegisterRequestDTO requestDTO) {

        if (userRepository.existsByUsername(requestDTO.getUsername())) {
            throw new DuplicateResourceException("Username already exists.");
        }

        User user = User.builder()
                .username(requestDTO.getUsername())
                .password(passwordEncoder.encode(requestDTO.getPassword()))
                .role(requestDTO.getRole())
                .enabled(true)
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    /**
     * Login User
     */
    @Override
    public JwtResponseDTO login(LoginRequestDTO requestDTO) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        requestDTO.getUsername(),

                        requestDTO.getPassword()));

        User user = userRepository.findByUsername(
                requestDTO.getUsername())
                .orElseThrow();

        String token = jwtUtil.generateToken(
                new CustomUserDetails(user));

        return JwtResponseDTO.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}