package com.ems.EmployeeManagementSystem.service;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

import com.ems.EmployeeManagementSystem.dto.request.LeaveRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.LeaveResponseDTO;

public interface LeaveService {

    LeaveResponseDTO applyLeave(LeaveRequestDTO dto);

    List<LeaveResponseDTO> getMyLeaves();
    
    List<LeaveResponseDTO> getAllLeaves();

    LeaveResponseDTO approveLeave(Long id);

    LeaveResponseDTO rejectLeave(Long id);

}