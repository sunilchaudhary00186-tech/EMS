package com.ems.EmployeeManagementSystem.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.ems.EmployeeManagementSystem.entity.LeaveStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LeaveResponseDTO {

    private Long id;

    private String employeeName;

    private String leaveType;

    private LocalDate startDate;

    private LocalDate endDate;

    private String reason;

    private LeaveStatus status;

    private LocalDateTime appliedAt;

}