package com.ems.EmployeeManagementSystem.dto.response;

import java.time.LocalDate;

import com.ems.EmployeeManagementSystem.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponseDTO {

    private Long id;

    private String employeeCode;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String designation;

    private double salary;

    private String address;

    private String departmentName;

    private Long departmentId;

    private LocalDate joiningDate;

    private Boolean active;

    private String username;

    private Role role;
}