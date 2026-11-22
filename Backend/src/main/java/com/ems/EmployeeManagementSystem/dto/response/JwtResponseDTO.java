package com.ems.EmployeeManagementSystem.dto.response;

import com.ems.EmployeeManagementSystem.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponseDTO {

    private String token;
    @Builder.Default
    private String type = "Bearer";

    private String username;

    private Role role;

}