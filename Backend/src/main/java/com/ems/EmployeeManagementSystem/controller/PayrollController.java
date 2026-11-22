package com.ems.EmployeeManagementSystem.controller;


import org.springframework.security.core.Authentication;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ems.EmployeeManagementSystem.dto.request.PayrollRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.PayrollResponseDTO;
import com.ems.EmployeeManagementSystem.dto.response.PayslipResponseDTO;
import com.ems.EmployeeManagementSystem.service.PayrollService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/api/payroll")
@RequiredArgsConstructor
public class PayrollController {

    private final PayrollService payrollService;

    @PostMapping("/generate")
    public ResponseEntity<PayrollResponseDTO> generatePayroll(
            @RequestBody PayrollRequestDTO dto) {

        return ResponseEntity.ok(
                payrollService.generatePayroll(dto));
    }

    @GetMapping("/{payrollId}/payslip")
    public ResponseEntity<PayslipResponseDTO> getPayslip(
            @PathVariable Long payrollId) {

        return ResponseEntity.ok(
                payrollService.getPayslip(payrollId));
    }

    // Employee - My Payslips
    @GetMapping("/my")
    public ResponseEntity<List<PayslipResponseDTO>> getMyPayslips(
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                payrollService.getMyPayslips(username)
        );
    }
}