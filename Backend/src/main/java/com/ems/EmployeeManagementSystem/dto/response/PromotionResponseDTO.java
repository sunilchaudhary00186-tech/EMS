package com.ems.EmployeeManagementSystem.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PromotionResponseDTO {

    private Long id;

    private String employeeCode;

    private String employeeName;

    private String oldDesignation;

    private String newDesignation;

    private String reason;

    private LocalDateTime promotedAt;
}