package com.ems.EmployeeManagementSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.User;

public interface EmployeeRepository extends JpaRepository<Employee, 
Long>{

	Optional<Employee> findByUserUsername(String username);
    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCaseOrDesignationContainingIgnoreCase(
            String firstName,
            String lastName,
            String email,
            String phoneNumber,
            String designation);

	List<Employee> findAll(Specification<Employee> specification);

	long countByActiveTrue();

	long countByActiveFalse();
	@Query("SELECT MAX(e.salary) FROM Employee e")
	Double getHighestSalary();

	@Query("SELECT MIN(e.salary) FROM Employee e")
	Double getLowestSalary();

	@Query("SELECT AVG(e.salary) FROM Employee e")
	Double getAverageSalary();
	boolean existsByEmail(String email);

	boolean existsByPhoneNumber(String phoneNumber);
	  Long findByUser(User user);
}