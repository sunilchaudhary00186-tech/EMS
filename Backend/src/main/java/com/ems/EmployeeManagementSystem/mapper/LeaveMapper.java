package com.ems.EmployeeManagementSystem.mapper;

import org.springframework.stereotype.Component;

import com.ems.EmployeeManagementSystem.dto.response.LeaveResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Leave;

@Component
public class LeaveMapper {

    public LeaveResponseDTO toResponse(Leave leave) {

        Employee employee = leave.getEmployee();

        String employeeName = "--";

        if (employee != null) {

            employeeName =
                    (employee.getFirstName() != null
                            ? employee.getFirstName()
                            : "")
                    + " "
                    + (employee.getLastName() != null
                            ? employee.getLastName()
                            : "");

            employeeName = employeeName.trim();
        }

        return LeaveResponseDTO.builder()

                .id(leave.getId())

                .employeeName(employeeName)

                .leaveType(leave.getLeaveType())

                .startDate(leave.getStartDate())

                .endDate(leave.getEndDate())

                .reason(leave.getReason())

                .status(leave.getStatus())

                .appliedAt(leave.getAppliedAt())

                .build();
    }
}