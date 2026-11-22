package com.ems.EmployeeManagementSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.EmployeeManagementSystem.entity.Promotion;

public interface PromotionRepository
extends JpaRepository<Promotion, Long> {

List<Promotion> findByEmployeeId(Long employeeId);
}