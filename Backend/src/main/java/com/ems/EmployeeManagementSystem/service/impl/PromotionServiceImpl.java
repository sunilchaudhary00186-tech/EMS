package com.ems.EmployeeManagementSystem.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ems.EmployeeManagementSystem.dto.request.PromotionRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.PromotionResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Promotion;
import com.ems.EmployeeManagementSystem.exception.ResourceNotFoundException;
import com.ems.EmployeeManagementSystem.mapper.PromotionMapper;
import com.ems.EmployeeManagementSystem.repository.EmployeeRepository;
import com.ems.EmployeeManagementSystem.repository.PromotionRepository;
import com.ems.EmployeeManagementSystem.service.PromotionService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PromotionServiceImpl
        implements PromotionService{

    private final PromotionRepository promotionRepository;

    private final EmployeeRepository employeeRepository;

    private final PromotionMapper promotionMapper;

    @Override
    public PromotionResponseDTO promoteEmployee(PromotionRequestDTO dto) {
    	System.out.println("Inside promoteEmployee()");
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found"));

        String oldDesignation = employee.getDesignation();
        Double oldSalary = employee.getSalary();

        employee.setDesignation(dto.getNewDesignation());
        employee.setSalary(oldSalary + 15000);

        employeeRepository.save(employee);

        Promotion promotion = Promotion.builder()
                .employee(employee)
                .oldDesignation(oldDesignation)
                .newDesignation(dto.getNewDesignation())
                .oldSalary(oldSalary)
                .newSalary(employee.getSalary())
                .promotionDate(LocalDate.now())
                .reason(dto.getReason())
                .approvedBy("ADMIN")
                .build();

        Promotion savedPromotion = promotionRepository.save(promotion);
        System.out.println(savedPromotion.getId());
        return promotionMapper.toResponse(savedPromotion);
    }
    @Override
    public List<PromotionResponseDTO> getAllPromotions() {

        return promotionRepository
                .findAll()
                .stream()
                .map(promotionMapper::toResponse)
                .toList();
    }

    @Override
    public List<PromotionResponseDTO> getEmployeePromotions(Long employeeId) {

        return promotionRepository
                .findByEmployeeId(employeeId)
                .stream()
                .map(promotionMapper::toResponse)
                .toList();
    }
}