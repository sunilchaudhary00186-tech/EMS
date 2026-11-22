package com.ems.EmployeeManagementSystem.dto.request;

import java.time.LocalDate;

import com.ems.EmployeeManagementSystem.entity.Role;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequestDTO {

    // ---------- USER ----------

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 30)
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 30)
    private String password;

    @NotNull(message = "Role is required")
    private Role role;

    // ---------- EMPLOYEE ----------

    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    @Email
    private String email;

    @Pattern(regexp = "^[6-9]\\d{9}$")
    private String phoneNumber;

    private String designation;

    @Positive
    private Double salary;

    @NotNull
    private LocalDate joiningDate;

    private Boolean active = true;

    private String address;

    @NotNull
    private Long departmentId;
}