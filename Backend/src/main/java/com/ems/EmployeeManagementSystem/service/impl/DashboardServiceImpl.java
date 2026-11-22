package com.ems.EmployeeManagementSystem.service.impl;

import org.springframework.stereotype.Service;

import com.ems.EmployeeManagementSystem.dto.response.DashboardResponseDTO;
import com.ems.EmployeeManagementSystem.entity.LeaveStatus;
import com.ems.EmployeeManagementSystem.repository.DepartmentRepository;
import com.ems.EmployeeManagementSystem.repository.EmployeeRepository;
import com.ems.EmployeeManagementSystem.repository.LeaveRepository;
import com.ems.EmployeeManagementSystem.service.DashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;

    private final DepartmentRepository departmentRepository;

    private final LeaveRepository leaveRepository;

    @Override
    public DashboardResponseDTO getDashboardData() {

        return DashboardResponseDTO.builder()

                .totalEmployees(employeeRepository.count())

                .activeEmployees(employeeRepository.countByActiveTrue())

                .inactiveEmployees(employeeRepository.countByActiveFalse())

                .totalDepartments(departmentRepository.count())

                .pendingLeaves(
                        leaveRepository.countByStatus(LeaveStatus.PENDING))

                .approvedLeaves(
                        leaveRepository.countByStatus(LeaveStatus.APPROVED))

                .rejectedLeaves(
                        leaveRepository.countByStatus(LeaveStatus.REJECTED))

                .build();
    }

}