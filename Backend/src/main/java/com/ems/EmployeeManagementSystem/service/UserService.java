package com.ems.EmployeeManagementSystem.service;

import com.ems.EmployeeManagementSystem.dto.request.ChangePasswordRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.UserResponseDTO;

public interface UserService {

    UserResponseDTO getLoggedInUser();
    void changePassword(ChangePasswordRequestDTO requestDTO);
}