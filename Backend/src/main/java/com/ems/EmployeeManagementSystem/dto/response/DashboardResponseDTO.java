package com.ems.EmployeeManagementSystem.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponseDTO {

    private Long totalEmployees;

    private Long activeEmployees;

    private Long inactiveEmployees;

    private Long totalDepartments;

    private Long pendingLeaves;

    private Long approvedLeaves;

    private Long rejectedLeaves;

}