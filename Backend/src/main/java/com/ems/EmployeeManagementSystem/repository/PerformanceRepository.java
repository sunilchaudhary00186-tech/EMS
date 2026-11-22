package com.ems.EmployeeManagementSystem.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.EmployeeManagementSystem.entity.Performance;

public interface PerformanceRepository
        extends JpaRepository<Performance, Long> {

	List<Performance> findByEmployeeId(Long employeeId);
	List<Performance> findAllByOrderByReviewDateDesc();
	boolean existsByEmployeeIdAndReviewDate(
	        Long employeeId,
	        LocalDate reviewDate);
}
