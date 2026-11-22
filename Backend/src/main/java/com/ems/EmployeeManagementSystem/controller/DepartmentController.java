package com.ems.EmployeeManagementSystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ems.EmployeeManagementSystem.dto.request.DepartmentRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.DepartmentResponseDTO;
import com.ems.EmployeeManagementSystem.service.DepartmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@Validated
public class DepartmentController {

    private final DepartmentService departmentService;

    /*
     * CREATE DEPARTMENT
     */
    @PostMapping
    public ResponseEntity<DepartmentResponseDTO> createDepartment(
            @Valid @RequestBody DepartmentRequestDTO requestDTO) {

        DepartmentResponseDTO response =
                departmentService.createDepartment(requestDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /*
     * GET ALL DEPARTMENTS
     */
    @GetMapping
    public ResponseEntity<List<DepartmentResponseDTO>> getAllDepartments() {

        return ResponseEntity.ok(
                departmentService.getAllDepartments());
    }

    /*
     * GET DEPARTMENT BY ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponseDTO> getDepartmentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                departmentService.getDepartmentById(id));
    }

    /*
     * UPDATE DEPARTMENT
     */
    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponseDTO> updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody DepartmentRequestDTO requestDTO) {

        return ResponseEntity.ok(
                departmentService.updateDepartment(id, requestDTO));
    }

    /*
     * DELETE DEPARTMENT
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(
            @PathVariable Long id) {

        departmentService.deleteDepartment(id);

        return ResponseEntity.ok("Department deleted successfully.");
    }

}