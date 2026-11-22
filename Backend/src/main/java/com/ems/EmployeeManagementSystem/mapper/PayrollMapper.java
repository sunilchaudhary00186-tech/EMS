package com.ems.EmployeeManagementSystem.mapper;

import org.springframework.stereotype.Component;

import com.ems.EmployeeManagementSystem.dto.response.PayrollResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Payroll;

@Component
public class PayrollMapper {

    public PayrollResponseDTO toResponse(Payroll payroll) {

        return PayrollResponseDTO.builder()
                .id(payroll.getId())
                .employeeName(
                        payroll.getEmployee().getFirstName()
                        + " "
                        + payroll.getEmployee().getLastName())
                .month(payroll.getMonth())
                .year(payroll.getYear())
                .basicSalary(payroll.getBasicSalary())
                .bonus(payroll.getBonus())
                .deductions(payroll.getDeductions())
                .netSalary(payroll.getNetSalary())
                .workingDays(payroll.getWorkingDays())
                .presentDays(payroll.getPresentDays())
                .paidLeaves(payroll.getPaidLeaves())
                .lossOfPayDays(payroll.getLossOfPayDays())
                .dailySalary(payroll.getDailySalary())
                .generatedDate(payroll.getGeneratedDate())
                .build();
    }
}