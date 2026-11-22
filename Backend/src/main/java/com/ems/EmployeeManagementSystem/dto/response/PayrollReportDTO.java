package com.ems.EmployeeManagementSystem.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PayrollReportDTO {

    private Long totalPayrolls;

    // Basic Salary
    private Double totalBasicSalary;
    private Double averageBasicSalary;
    private Double highestBasicSalary;
    private Double lowestBasicSalary;

    // Net Salary
    private Double totalNetSalary;
    private Double averageNetSalary;
    private Double highestNetSalary;
    private Double lowestNetSalary;
}