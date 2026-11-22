package com.ems.EmployeeManagementSystem.service;


import java.util.List;

import com.ems.EmployeeManagementSystem.dto.request.DepartmentRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.DepartmentResponseDTO;

public interface DepartmentService {

    DepartmentResponseDTO createDepartment(
            DepartmentRequestDTO requestDTO);

    DepartmentResponseDTO updateDepartment(
            Long id,
            DepartmentRequestDTO requestDTO);

    DepartmentResponseDTO getDepartmentById(Long id);

    List<DepartmentResponseDTO> getAllDepartments();

    void deleteDepartment(Long id);

}