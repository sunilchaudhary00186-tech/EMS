package com.ems.EmployeeManagementSystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ems.EmployeeManagementSystem.dto.response.DashboardResponseDTO;
import com.ems.EmployeeManagementSystem.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/hr")
    public ResponseEntity<DashboardResponseDTO> getHrDashboard() {
        return ResponseEntity.ok(
            dashboardService.getDashboardData()
        );
    }

    @GetMapping("/admin")
    public ResponseEntity<DashboardResponseDTO> getAdminDashboard() {
        return ResponseEntity.ok(
            dashboardService.getDashboardData()
        );
    }

}