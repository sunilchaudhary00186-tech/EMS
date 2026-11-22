package com.ems.EmployeeManagementSystem.service;

import com.ems.EmployeeManagementSystem.dto.request.LoginRequestDTO;
import com.ems.EmployeeManagementSystem.dto.request.RegisterRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.JwtResponseDTO;

public interface AuthService {

    JwtResponseDTO login(LoginRequestDTO request);

    String register(RegisterRequestDTO request);

}