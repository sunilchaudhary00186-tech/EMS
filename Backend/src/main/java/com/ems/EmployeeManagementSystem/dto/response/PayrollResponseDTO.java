package com.ems.EmployeeManagementSystem.dto.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PayrollResponseDTO {

    private Long id;

    private String employeeName;

    private int month;

    private Integer year;

    private Double basicSalary;

    private Double bonus;

    private Double deductions;

    private Double netSalary;
    private Integer workingDays;

    private Integer presentDays;

    private Integer paidLeaves;

    private Integer lossOfPayDays;

    private Double dailySalary;

    private LocalDate generatedDate;
}