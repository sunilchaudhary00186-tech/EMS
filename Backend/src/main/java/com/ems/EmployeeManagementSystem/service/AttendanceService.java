package com.ems.EmployeeManagementSystem.service;

import java.util.List;

import com.ems.EmployeeManagementSystem.dto.response.AttendanceResponseDTO;

public interface AttendanceService {

    AttendanceResponseDTO checkIn();

    AttendanceResponseDTO checkOut();

    List<AttendanceResponseDTO> getMyAttendance();

    List<AttendanceResponseDTO> getAllAttendance();

    
}