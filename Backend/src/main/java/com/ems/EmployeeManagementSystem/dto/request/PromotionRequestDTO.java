package com.ems.EmployeeManagementSystem.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PromotionRequestDTO {

    @NotNull(message = "Employee Id is required")
    private Long employeeId;

    @NotBlank(message = "New designation is required")
    private String newDesignation;

    @NotBlank(message = "Reason is required")
    private String reason;
}