package com.ems.EmployeeManagementSystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.EmployeeManagementSystem.entity.Department;

public interface DepartmentRepository
extends JpaRepository<Department, Long> {

Optional<Department> findByDepartmentName(String departmentName);

Optional<Department> findByDepartmentCode(String departmentCode);

boolean existsByDepartmentName(String departmentName);

boolean existsByDepartmentCode(String departmentCode);
long count();
}