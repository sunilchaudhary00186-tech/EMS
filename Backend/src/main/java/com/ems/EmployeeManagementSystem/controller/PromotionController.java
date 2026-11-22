package com.ems.EmployeeManagementSystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.EmployeeManagementSystem.dto.request.PromotionRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.PromotionResponseDTO;
import com.ems.EmployeeManagementSystem.service.PromotionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/promotions")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    // HR / ADMIN
    @PostMapping
    public ResponseEntity<PromotionResponseDTO> promoteEmployee(
            @Valid @RequestBody PromotionRequestDTO dto) {

        return ResponseEntity.ok(
                promotionService.promoteEmployee(dto));
    }

    // HR / ADMIN
    @GetMapping
    public ResponseEntity<List<PromotionResponseDTO>> getAllPromotions() {

        return ResponseEntity.ok(
                promotionService.getAllPromotions());
    }

    // HR / ADMIN
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<PromotionResponseDTO>> getEmployeePromotions(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                promotionService.getEmployeePromotions(employeeId));
    }
}