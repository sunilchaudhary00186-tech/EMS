package com.ems.EmployeeManagementSystem.service;


import java.util.List;

import org.springframework.data.domain.Page;

import com.ems.EmployeeManagementSystem.dto.request.EmployeeRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.EmployeeResponseDTO;

public interface EmployeeService {
    EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto);

    List<EmployeeResponseDTO> saveAll(List<EmployeeRequestDTO> dtoList);
    Page<EmployeeResponseDTO> getAllEmployees(int page, int size, String search);
    EmployeeResponseDTO getEmployeeById(Long id);

    EmployeeResponseDTO updateEmployee(Long id,
                                       EmployeeRequestDTO dto);
    List<EmployeeResponseDTO> searchEmployees(String keyword);
    void deleteEmployee(Long id);
    
    List<EmployeeResponseDTO> filterEmployees(
            String designation,
            Boolean active,
            Double minSalary,
            Double maxSalary);
    EmployeeResponseDTO getMyProfile();
	
}