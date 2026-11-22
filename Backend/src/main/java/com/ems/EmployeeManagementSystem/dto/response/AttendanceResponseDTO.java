package com.ems.EmployeeManagementSystem.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.ems.EmployeeManagementSystem.entity.AttendanceStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttendanceResponseDTO {

    private Long id;

    private Long employeeId;

    private String employeeName;

    private LocalDate attendanceDate;

    private LocalTime checkInTime;

    private LocalTime checkOutTime;

    private AttendanceStatus status;

    private Double workingHours;
}