package com.ems.EmployeeManagementSystem.mapper;

import com.ems.EmployeeManagementSystem.dto.request.DepartmentRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.DepartmentResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Department;

public class DepartmentMapper {

    public static Department toEntity(DepartmentRequestDTO dto) {

        return Department.builder()
                .departmentName(dto.getDepartmentName())
                .departmentCode(dto.getDepartmentCode())
                .description(dto.getDescription())
                .build();
    }

    public static DepartmentResponseDTO toResponseDTO(Department department) {

        return DepartmentResponseDTO.builder()
                .id(department.getId())
                .departmentName(department.getDepartmentName())
                .departmentCode(department.getDepartmentCode())
                .description(department.getDescription())
                .totalEmployees(
                        department.getEmployees() == null
                                ? 0
                                : department.getEmployees().size())
                .createdAt(department.getCreatedAt())
                .updatedAt(department.getUpdatedAt())
                .build();
    }
}