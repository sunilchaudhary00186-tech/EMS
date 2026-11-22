package com.ems.EmployeeManagementSystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ems.EmployeeManagementSystem.dto.response.AttendanceResponseDTO;
import com.ems.EmployeeManagementSystem.service.AttendanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;


    // ============================================
    // CHECK IN
    // ============================================

    @PostMapping("/check-in")
    public ResponseEntity<AttendanceResponseDTO> checkIn() {

        return ResponseEntity.ok(
                attendanceService.checkIn()
        );
    }


    // ============================================
    // CHECK OUT
    // ============================================

    @PutMapping("/check-out")
    public ResponseEntity<AttendanceResponseDTO> checkOut() {

        return ResponseEntity.ok(
                attendanceService.checkOut()
        );
    }


    // ============================================
    // MY ATTENDANCE
    // ============================================

    @GetMapping("/my")
    public ResponseEntity<List<AttendanceResponseDTO>>
            getMyAttendance() {

        return ResponseEntity.ok(
                attendanceService.getMyAttendance()
        );
    }


    // ============================================
    // ALL ATTENDANCE
    // ============================================

    @GetMapping("/all")
    public ResponseEntity<List<AttendanceResponseDTO>>
            getAllAttendance() {

        return ResponseEntity.ok(
                attendanceService.getAllAttendance()
        );
    }
}