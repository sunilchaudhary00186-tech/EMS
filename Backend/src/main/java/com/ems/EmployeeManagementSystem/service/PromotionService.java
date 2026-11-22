package com.ems.EmployeeManagementSystem.service;

import java.util.List;

import com.ems.EmployeeManagementSystem.dto.request.PromotionRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.PromotionResponseDTO;

public interface PromotionService {

    PromotionResponseDTO promoteEmployee(PromotionRequestDTO dto);

    List<PromotionResponseDTO> getAllPromotions();

    List<PromotionResponseDTO> getEmployeePromotions(Long employeeId);

}