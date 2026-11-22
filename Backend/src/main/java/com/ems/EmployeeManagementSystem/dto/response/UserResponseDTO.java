package com.ems.EmployeeManagementSystem.dto.response;

import com.ems.EmployeeManagementSystem.entity.Role;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {

    private Long id;

    private String username;

    private Role role;

    private Boolean enabled;

}