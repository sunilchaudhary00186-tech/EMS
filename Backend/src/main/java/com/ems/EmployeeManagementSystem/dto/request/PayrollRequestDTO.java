package com.ems.EmployeeManagementSystem.dto.request;

import lombok.Data;

@Data
public class PayrollRequestDTO {

    private Long employeeId;

    private int month;

    private Integer year;

    private Double bonus;

    private Double deductions;
}