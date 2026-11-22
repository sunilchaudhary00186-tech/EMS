package com.ems.EmployeeManagementSystem.service;

import java.time.LocalDate;
import java.util.List;

import com.ems.EmployeeManagementSystem.dto.request.PerformanceRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.PerformanceResponseDTO;

public interface PerformanceService {

    PerformanceResponseDTO addPerformanceReview(
            PerformanceRequestDTO dto);

    List<PerformanceResponseDTO> getAllReviews();

    List<PerformanceResponseDTO> getReviewsByEmployee(
            Long employeeId);

    PerformanceResponseDTO updateReview(
            Long reviewId,
            PerformanceRequestDTO dto);

    void deleteReview(Long reviewId);
    


}