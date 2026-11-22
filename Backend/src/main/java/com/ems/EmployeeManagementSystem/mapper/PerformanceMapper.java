package com.ems.EmployeeManagementSystem.mapper;

import org.springframework.stereotype.Component;

import com.ems.EmployeeManagementSystem.dto.response.PerformanceResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Performance;

@Component
public class PerformanceMapper {

    public PerformanceResponseDTO toResponse(Performance performance) {

        Employee employee = performance.getEmployee();

        return PerformanceResponseDTO.builder()

                .id(performance.getId())

                .employeeCode(employee.getEmployeeCode())

                .employeeName(
                        employee.getFirstName() + " "
                        + employee.getLastName())

                .rating(performance.getRating())

                .comments(performance.getComments())

                .reviewDate(performance.getReviewDate())

                .reviewedBy(performance.getReviewedBy())

                .createdAt(performance.getCreatedAt())

                .build();
    }
}