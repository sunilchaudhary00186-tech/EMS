package com.ems.EmployeeManagementSystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.EmployeeManagementSystem.dto.response.AttendanceReportDTO;
import com.ems.EmployeeManagementSystem.dto.response.EmployeeReportDTO;
import com.ems.EmployeeManagementSystem.dto.response.LeaveReportDTO;
import com.ems.EmployeeManagementSystem.dto.response.PayrollReportDTO;
import com.ems.EmployeeManagementSystem.service.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/employees")
    public ResponseEntity<EmployeeReportDTO> getEmployeeReport() {

        return ResponseEntity.ok(
                reportService.getEmployeeReport());
    }

    @GetMapping("/leaves")
    public ResponseEntity<LeaveReportDTO> getLeaveReport() {

        return ResponseEntity.ok(
                reportService.getLeaveReport());
    }
    @GetMapping("/attendance")
    public ResponseEntity<AttendanceReportDTO> getAttendanceReport() {

        return ResponseEntity.ok(
                reportService.getAttendanceReport());
    }
    @GetMapping("/payroll")
    public ResponseEntity<PayrollReportDTO> getPayrollReport() {

        return ResponseEntity.ok(
                reportService.getPayrollReport());
    }
}