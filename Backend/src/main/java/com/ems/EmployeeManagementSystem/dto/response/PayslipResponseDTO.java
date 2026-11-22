package com.ems.EmployeeManagementSystem.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PayslipResponseDTO {

    private Long payrollId;

    private String employeeCode;
    private String employeeName;
    private String designation;
    private String department;

    private Integer month;
    private Integer year;

    private Double basicSalary;
    private Double dailySalary;

    private Integer workingDays;
    private Integer presentDays;
    private Integer paidLeaves;
    private Integer lossOfPayDays;

    private Double bonus;
    private Double deductions;
    private Double netSalary;
}