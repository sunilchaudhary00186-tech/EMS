package com.ems.EmployeeManagementSystem.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeReportDTO {

    private Long totalEmployees;

    private Long activeEmployees;

    private Long inactiveEmployees;

    private Long totalDepartments;
}