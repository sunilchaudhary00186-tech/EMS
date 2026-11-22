package com.ems.EmployeeManagementSystem.service.impl;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ems.EmployeeManagementSystem.dto.response.AttendanceResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Attendance;
import com.ems.EmployeeManagementSystem.entity.AttendanceStatus;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.exception.DuplicateResourceException;
import com.ems.EmployeeManagementSystem.exception.ResourceNotFoundException;
import com.ems.EmployeeManagementSystem.mapper.AttendanceMapper;
import com.ems.EmployeeManagementSystem.repository.AttendanceRepository;
import com.ems.EmployeeManagementSystem.repository.EmployeeRepository;
import com.ems.EmployeeManagementSystem.service.AttendanceService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceMapper attendanceMapper;


    // ============================================
    // GET CURRENT EMPLOYEE
    // ============================================

    private Employee getCurrentEmployee() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new ResourceNotFoundException(
                    "User is not authenticated"
            );
        }

        String username = authentication.getName();

        return employeeRepository
                .findByUserUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found"
                        )
                );
    }


    // ============================================
    // CHECK IN
    // ============================================

    @Override
    public AttendanceResponseDTO checkIn() {

        Employee employee = getCurrentEmployee();

        LocalDate today = LocalDate.now();

        attendanceRepository
                .findByEmployeeAndAttendanceDate(
                        employee,
                        today
                )
                .ifPresent(attendance -> {
                    throw new DuplicateResourceException(
                            "Attendance already marked for today"
                    );
                });

        Attendance attendance =
                Attendance.builder()
                        .employee(employee)
                        .attendanceDate(today)
                        .checkInTime(LocalTime.now())
                        .status(AttendanceStatus.PRESENT)
                        .workingHours(0.0)
                        .build();

        Attendance saved =
                attendanceRepository.save(attendance);

        return attendanceMapper.toResponse(saved);
    }


    // ============================================
    // CHECK OUT
    // ============================================

    @Override
    public AttendanceResponseDTO checkOut() {

        Employee employee = getCurrentEmployee();

        LocalDate today = LocalDate.now();

        Attendance attendance =
                attendanceRepository
                        .findByEmployeeAndAttendanceDate(
                                employee,
                                today
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "You haven't checked in today"
                                )
                        );

        if (attendance.getCheckOutTime() != null) {

            throw new DuplicateResourceException(
                    "Already checked out today"
            );
        }

        LocalTime checkOutTime = LocalTime.now();

        attendance.setCheckOutTime(checkOutTime);

        Duration duration =
                Duration.between(
                        attendance.getCheckInTime(),
                        checkOutTime
                );

        double hours =
                duration.toMinutes() / 60.0;

        attendance.setWorkingHours(hours);

        if (hours >= 8) {

            attendance.setStatus(
                    AttendanceStatus.PRESENT
            );

        } else {

            attendance.setStatus(
                    AttendanceStatus.HALF_DAY
            );
        }

        Attendance saved =
                attendanceRepository.save(attendance);

        return attendanceMapper.toResponse(saved);
    }


    // ============================================
    // MY ATTENDANCE
    // ============================================

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceResponseDTO> getMyAttendance() {

        Employee employee = getCurrentEmployee();

        return attendanceRepository
                .findByEmployee(employee)
                .stream()
                .map(attendanceMapper::toResponse)
                .toList();
    }


    // ============================================
    // ALL ATTENDANCE
    // ============================================

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceResponseDTO> getAllAttendance() {

        return attendanceRepository
                .findAll()
                .stream()
                .map(attendanceMapper::toResponse)
                .toList();
    }
}