package com.ems.EmployeeManagementSystem.service.impl;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ems.EmployeeManagementSystem.dto.request.DepartmentRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.DepartmentResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Department;
import com.ems.EmployeeManagementSystem.exception.DuplicateResourceException;
import com.ems.EmployeeManagementSystem.exception.ResourceNotFoundException;
import com.ems.EmployeeManagementSystem.mapper.DepartmentMapper;
import com.ems.EmployeeManagementSystem.repository.DepartmentRepository;
import com.ems.EmployeeManagementSystem.service.DepartmentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    /**
     * CREATE DEPARTMENT
     */
    @Override
    public DepartmentResponseDTO createDepartment(DepartmentRequestDTO requestDTO) {

        if (departmentRepository.existsByDepartmentName(requestDTO.getDepartmentName())) {
            throw new DuplicateResourceException("Department name already exists.");
        }

        if (departmentRepository.existsByDepartmentCode(requestDTO.getDepartmentCode())) {
            throw new DuplicateResourceException("Department code already exists.");
        }

        Department department = DepartmentMapper.toEntity(requestDTO);

        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.toResponseDTO(savedDepartment);
    }

    /**
     * GET DEPARTMENT BY ID
     */
    @Override
    public DepartmentResponseDTO getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id : " + id));

        return DepartmentMapper.toResponseDTO(department);
    }

    /**
     * GET ALL DEPARTMENTS
     */
    @Override
    public List<DepartmentResponseDTO> getAllDepartments() {

        return departmentRepository.findAll()
                .stream()
                .map(DepartmentMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * UPDATE DEPARTMENT
     */
    @Override
    public DepartmentResponseDTO updateDepartment(Long id, DepartmentRequestDTO requestDTO) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id : " + id));

        // Check duplicate department name
        if (!department.getDepartmentName().equals(requestDTO.getDepartmentName())
                && departmentRepository.existsByDepartmentName(requestDTO.getDepartmentName())) {

            throw new DuplicateResourceException("Department name already exists.");
        }

        // Check duplicate department code
        if (!department.getDepartmentCode().equals(requestDTO.getDepartmentCode())
                && departmentRepository.existsByDepartmentCode(requestDTO.getDepartmentCode())) {

            throw new DuplicateResourceException("Department code already exists.");
        }

        department.setDepartmentName(requestDTO.getDepartmentName());
        department.setDepartmentCode(requestDTO.getDepartmentCode());
        department.setDescription(requestDTO.getDescription());

        Department updatedDepartment = departmentRepository.save(department);

        return DepartmentMapper.toResponseDTO(updatedDepartment);
    }

    /**
     * DELETE DEPARTMENT
     */
    @Override
    public void deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id : " + id));

        departmentRepository.delete(department);
    }

}