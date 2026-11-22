package com.ems.EmployeeManagementSystem.dto.request;

import java.time.LocalDate;

import com.ems.EmployeeManagementSystem.entity.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequestDTO {

	private String employeeCode;
    @NotBlank
    @Size(min = 2, max = 50)
    private String firstName;


    @NotBlank
    @Size(min = 2, max = 50)
    private String lastName;

    @Email
    @NotBlank
    private String email;

    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Invalid mobile number")
    private String phoneNumber;

    @NotBlank
    private String designation;

    @Positive
    private double salary;

    @PastOrPresent
    private LocalDate joiningDate;

    private Boolean active;

    private String address;

    @NotNull
    private Long departmentId;

    // Login Details

    @NotBlank
    private String username;

    @Pattern(
    	    regexp = "^$|.{6,}",
    	    message = "Password must be at least 6 characters"
    	)
    	private String password;
    @NotNull
    private Role role;
}