package com.ems.EmployeeManagementSystem.mapper;

import org.springframework.stereotype.Component;

import com.ems.EmployeeManagementSystem.dto.response.AttendanceResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Attendance;
import com.ems.EmployeeManagementSystem.entity.Employee;

@Component
public class AttendanceMapper {

    public AttendanceResponseDTO toResponse(Attendance attendance) {

        Employee employee = attendance.getEmployee();

        return AttendanceResponseDTO.builder()
                .id(attendance.getId())
                .employeeId(employee.getId())
                .employeeName(
                        employee.getFirstName() + " " + employee.getLastName()
                )
                .attendanceDate(attendance.getAttendanceDate())
                .checkInTime(attendance.getCheckInTime())
                .checkOutTime(attendance.getCheckOutTime())
                .status(attendance.getStatus())
                .workingHours(attendance.getWorkingHours())
                .build();
    }
}