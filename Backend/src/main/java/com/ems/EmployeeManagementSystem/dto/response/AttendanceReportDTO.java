package com.ems.EmployeeManagementSystem.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttendanceReportDTO {

    private Long totalAttendance;

    private Long presentCount;

    private Long halfDayCount;

    private Double averageWorkingHours;
}