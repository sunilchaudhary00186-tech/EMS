package com.ems.EmployeeManagementSystem.mapper;

import org.springframework.stereotype.Component;

import com.ems.EmployeeManagementSystem.dto.response.PromotionResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Promotion;

@Component
public class PromotionMapper {

    public PromotionResponseDTO toResponse(Promotion promotion) {

        Employee employee = promotion.getEmployee();

        return PromotionResponseDTO.builder()

                .id(promotion.getId())

                .employeeCode(employee.getEmployeeCode())

                .employeeName(
                        employee.getFirstName()
                                + " "
                                + employee.getLastName())

                .oldDesignation(
                        promotion.getOldDesignation())

                .newDesignation(
                        promotion.getNewDesignation())

                .reason(
                        promotion.getReason())

                .promotedAt(
                        promotion.getCreatedAt())

                .build();
    }
}