package com.ems.EmployeeManagementSystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ems.EmployeeManagementSystem.dto.request.PerformanceRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.PerformanceResponseDTO;
import com.ems.EmployeeManagementSystem.service.PerformanceService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/performance")
@RequiredArgsConstructor
public class PerformanceController {

    private final PerformanceService performanceService;

    @PostMapping
    public ResponseEntity<PerformanceResponseDTO> addReview(
            @Valid @RequestBody PerformanceRequestDTO dto) {

        return ResponseEntity.ok(
                performanceService.addPerformanceReview(dto));
    }

    @GetMapping
    public ResponseEntity<List<PerformanceResponseDTO>> getAllReviews() {

        return ResponseEntity.ok(
                performanceService.getAllReviews());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<PerformanceResponseDTO>>
    getReviewsByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                performanceService.getReviewsByEmployee(employeeId));
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<PerformanceResponseDTO>
    updateReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody PerformanceRequestDTO dto) {

        return ResponseEntity.ok(
                performanceService.updateReview(reviewId, dto));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId) {

        performanceService.deleteReview(reviewId);

        return ResponseEntity.noContent().build();
    }
}