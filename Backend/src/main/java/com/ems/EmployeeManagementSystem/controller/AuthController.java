package com.ems.EmployeeManagementSystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ems.EmployeeManagementSystem.dto.request.LoginRequestDTO;
import com.ems.EmployeeManagementSystem.dto.request.RegisterRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.JwtResponseDTO;
import com.ems.EmployeeManagementSystem.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequestDTO requestDTO) {

        return new ResponseEntity<>(
                authService.register(requestDTO),
                HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO requestDTO) {

        return ResponseEntity.ok(authService.login(requestDTO));
    }

}