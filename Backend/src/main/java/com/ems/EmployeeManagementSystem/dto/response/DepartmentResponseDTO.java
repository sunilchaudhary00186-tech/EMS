package com.ems.EmployeeManagementSystem.dto.response;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentResponseDTO {

    private Long id;

    private String departmentName;

    private String departmentCode;

    private String description;

    private Integer totalEmployees;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}