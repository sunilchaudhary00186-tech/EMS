package com.ems.EmployeeManagementSystem.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentRequestDTO {

    @NotBlank(message = "Department name is required")
    @Size(min = 2, max = 100)
    private String departmentName;

    @NotBlank(message = "Department code is required")
    @Size(min = 2, max = 20)
    private String departmentCode;

    @Size(max = 500)
    private String description;
}