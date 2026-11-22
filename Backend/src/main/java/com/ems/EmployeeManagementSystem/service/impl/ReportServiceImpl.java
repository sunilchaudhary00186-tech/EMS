package com.ems.EmployeeManagementSystem.service.impl;

import org.springframework.stereotype.Service;

import com.ems.EmployeeManagementSystem.dto.response.AttendanceReportDTO;
import com.ems.EmployeeManagementSystem.dto.response.EmployeeReportDTO;
import com.ems.EmployeeManagementSystem.dto.response.LeaveReportDTO;
import com.ems.EmployeeManagementSystem.dto.response.PayrollReportDTO;
import com.ems.EmployeeManagementSystem.entity.AttendanceStatus;
import com.ems.EmployeeManagementSystem.entity.LeaveStatus;
import com.ems.EmployeeManagementSystem.repository.AttendanceRepository;
import com.ems.EmployeeManagementSystem.repository.DepartmentRepository;
import com.ems.EmployeeManagementSystem.repository.EmployeeRepository;
import com.ems.EmployeeManagementSystem.repository.LeaveRepository;
import com.ems.EmployeeManagementSystem.repository.PayrollRepository;
import com.ems.EmployeeManagementSystem.service.ReportService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final EmployeeRepository employeeRepository;

    private final DepartmentRepository departmentRepository;

    private final LeaveRepository leaveRepository;
    
    private final AttendanceRepository attendanceRepository;

    private final PayrollRepository payrollRepository;
    @Override
    public EmployeeReportDTO getEmployeeReport() {

        long totalEmployees = employeeRepository.count();

        long activeEmployees = employeeRepository.countByActiveTrue();

        long inactiveEmployees = employeeRepository.countByActiveFalse();

        long totalDepartments = departmentRepository.count();

        return EmployeeReportDTO.builder()
                .totalEmployees(totalEmployees)
                .activeEmployees(activeEmployees)
                .inactiveEmployees(inactiveEmployees)
                .totalDepartments(totalDepartments)
                .build();
    }

    @Override
    public LeaveReportDTO getLeaveReport() {

        long totalLeaves = leaveRepository.count();

        long pendingLeaves =
                leaveRepository.countByStatus(LeaveStatus.PENDING);

        long approvedLeaves =
                leaveRepository.countByStatus(LeaveStatus.APPROVED);

        long rejectedLeaves =
                leaveRepository.countByStatus(LeaveStatus.REJECTED);

        return LeaveReportDTO.builder()
                .totalLeaves(totalLeaves)
                .pendingLeaves(pendingLeaves)
                .approvedLeaves(approvedLeaves)
                .rejectedLeaves(rejectedLeaves)
                .build();
    }
    @Override
    public AttendanceReportDTO getAttendanceReport() {

        long totalAttendance = attendanceRepository.count();

        long presentCount =
                attendanceRepository.countByStatus(
                        AttendanceStatus.PRESENT);

        long halfDayCount =
                attendanceRepository.countByStatus(
                        AttendanceStatus.HALF_DAY);

        Double averageHours =
                attendanceRepository.getAverageWorkingHours();

        if (averageHours == null) {
            averageHours = 0.0;
        }

        return AttendanceReportDTO.builder()
                .totalAttendance(totalAttendance)
                .presentCount(presentCount)
                .halfDayCount(halfDayCount)
                .averageWorkingHours(averageHours)
                .build();
    }
    @Override
    public PayrollReportDTO getPayrollReport() {

        long totalPayrolls =
                payrollRepository.count();


        // ==========================================
        // BASIC SALARY
        // ==========================================

        Double totalBasicSalary =
                payrollRepository.getTotalBasicSalary();

        Double averageBasicSalary =
                payrollRepository.getAverageBasicSalary();

        Double highestBasicSalary =
                payrollRepository.getHighestBasicSalary();

        Double lowestBasicSalary =
                payrollRepository.getLowestBasicSalary();


        // ==========================================
        // NET SALARY
        // ==========================================

        Double totalNetSalary =
                payrollRepository.getTotalNetSalary();

        Double averageNetSalary =
                payrollRepository.getAverageNetSalary();

        Double highestNetSalary =
                payrollRepository.getHighestNetSalary();

        Double lowestNetSalary =
                payrollRepository.getLowestNetSalary();


        // ==========================================
        // RESPONSE
        // ==========================================

        return PayrollReportDTO.builder()

                .totalPayrolls(totalPayrolls)

                .totalBasicSalary(totalBasicSalary)
                .averageBasicSalary(averageBasicSalary)
                .highestBasicSalary(highestBasicSalary)
                .lowestBasicSalary(lowestBasicSalary)

                .totalNetSalary(totalNetSalary)
                .averageNetSalary(averageNetSalary)
                .highestNetSalary(highestNetSalary)
                .lowestNetSalary(lowestNetSalary)

                .build();
    }
}