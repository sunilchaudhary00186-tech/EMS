package com.ems.EmployeeManagementSystem.service;

import com.ems.EmployeeManagementSystem.dto.response.AttendanceReportDTO;
import com.ems.EmployeeManagementSystem.dto.response.EmployeeReportDTO;
import com.ems.EmployeeManagementSystem.dto.response.LeaveReportDTO;
import com.ems.EmployeeManagementSystem.dto.response.PayrollReportDTO;

public interface ReportService {

    EmployeeReportDTO getEmployeeReport();
    LeaveReportDTO getLeaveReport();
    AttendanceReportDTO getAttendanceReport();
    PayrollReportDTO getPayrollReport();
}