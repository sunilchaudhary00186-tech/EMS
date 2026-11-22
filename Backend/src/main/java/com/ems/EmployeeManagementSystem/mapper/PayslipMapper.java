package com.ems.EmployeeManagementSystem.mapper;

import org.springframework.stereotype.Component;

import com.ems.EmployeeManagementSystem.dto.response.PayslipResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Payroll;

@Component
public class PayslipMapper {

    public PayslipResponseDTO toResponse(Payroll payroll){

        Employee employee = payroll.getEmployee();

        return PayslipResponseDTO.builder()

                .payrollId(payroll.getId())

                .employeeName(
                        employee.getFirstName()
                        + " "
                        + employee.getLastName())

                .designation(employee.getDesignation())

                .department(employee.getDepartment().getDepartmentName())

                .month(payroll.getMonth())

                .year(payroll.getYear())

                .basicSalary(payroll.getBasicSalary())

                .bonus(payroll.getBonus())

                .deductions(payroll.getDeductions())

                .netSalary(payroll.getNetSalary())

                .build();
    }
}