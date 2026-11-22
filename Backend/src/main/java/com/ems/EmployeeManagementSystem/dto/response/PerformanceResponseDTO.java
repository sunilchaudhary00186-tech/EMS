package com.ems.EmployeeManagementSystem.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PerformanceResponseDTO {

    private Long id;

    private String employeeCode;

    private String employeeName;

    private Integer rating;

    private String comments;

    private LocalDate reviewDate;

    private String reviewedBy;

    private LocalDateTime createdAt;

}