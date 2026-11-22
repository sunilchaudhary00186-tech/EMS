package com.ems.EmployeeManagementSystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ems.EmployeeManagementSystem.dto.request.ChangePasswordRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.UserResponseDTO;
import com.ems.EmployeeManagementSystem.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getLoggedInUser() {

        return ResponseEntity.ok(
                userService.getLoggedInUser());
    }
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody @Valid ChangePasswordRequestDTO requestDTO) {

        userService.changePassword(requestDTO);

        return ResponseEntity.ok("Password changed successfully.");
    }

}