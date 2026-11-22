package com.ems.EmployeeManagementSystem.controller;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.EmployeeManagementSystem.dto.request.EmployeeRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.EmployeeResponseDTO;
import com.ems.EmployeeManagementSystem.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    /*
     * CREATE EMPLOYEE
     */
    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> createEmployee(
            @Valid @RequestBody EmployeeRequestDTO dto) {

        System.out.println("CONTROLLER ADDRESS = " + dto.getAddress());

        return ResponseEntity.ok(
                employeeService.createEmployee(dto)
        );
    }
    @PostMapping("/saveAll")
    public ResponseEntity<List<EmployeeResponseDTO>> saveAll(
            @RequestBody List<EmployeeRequestDTO> dtoList) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeService.saveAll(dtoList));
    }

    /*
     * GET ALL EMPLOYEES
     */
//    @GetMapping
//    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {
//
//        return ResponseEntity.ok(
//                employeeService.getAllEmployees());
//    }
    @GetMapping
    public ResponseEntity<Page<EmployeeResponseDTO>> getAllEmployees(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "") String search) {

        return ResponseEntity.ok(
                employeeService.getAllEmployees(page, size, search));
    }

    /*
     * GET EMPLOYEE BY ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                employeeService.getEmployeeById(id));
    }

    /*
     * UPDATE EMPLOYEE
     */
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequestDTO requestDTO){

        return ResponseEntity.ok(employeeService.updateEmployee(id, requestDTO));
    }
    /*
     * DELETE EMPLOYEE
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.ok("Employee deleted successfully");
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<EmployeeResponseDTO>> searchEmployees(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                employeeService.searchEmployees(keyword));
    }
    
    @GetMapping("/filter")
    public ResponseEntity<List<EmployeeResponseDTO>> filterEmployees(

            @RequestParam(required = false) String designation,

            @RequestParam(required = false) Boolean active,

            @RequestParam(required = false) Double minSalary,

            @RequestParam(required = false) Double maxSalary) {

        return ResponseEntity.ok(

                employeeService.filterEmployees(

                        designation,

                        active,

                        minSalary,

                        maxSalary));
    }
    @GetMapping("/profile")
    public ResponseEntity<EmployeeResponseDTO> getMyProfile() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        System.out.println(auth);
        System.out.println(auth.getAuthorities());

        return ResponseEntity.ok(employeeService.getMyProfile());
    }
}