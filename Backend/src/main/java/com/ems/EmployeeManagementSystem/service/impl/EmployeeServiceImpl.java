package com.ems.EmployeeManagementSystem.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ems.EmployeeManagementSystem.dto.request.EmployeeRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.EmployeeResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Department;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.User;
import com.ems.EmployeeManagementSystem.exception.DuplicateResourceException;
import com.ems.EmployeeManagementSystem.exception.ResourceNotFoundException;
import com.ems.EmployeeManagementSystem.mapper.EmployeeMapper;
import com.ems.EmployeeManagementSystem.repository.DepartmentRepository;
import com.ems.EmployeeManagementSystem.repository.EmployeeRepository;
import com.ems.EmployeeManagementSystem.repository.UserRepository;
import com.ems.EmployeeManagementSystem.service.EmployeeService;
import com.ems.EmployeeManagementSystem.specification.EmployeeSpecification;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private final EmployeeRepository employeeRepository;
	private final DepartmentRepository departmentRepository;
	private final EmployeeMapper employeeMapper;
	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto) {

	    // Check duplicate username
	    if (userRepository.existsByUsername(dto.getUsername())) {
	        throw new DuplicateResourceException("Username already exists.");
	    }

	    // Check duplicate email
	    if (employeeRepository.existsByEmail(dto.getEmail())) {
	        throw new DuplicateResourceException("Email already exists.");
	    }

	    // Check duplicate phone
	    if (employeeRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
	        throw new DuplicateResourceException("Phone number already exists.");
	    }

	    Department department = departmentRepository.findById(dto.getDepartmentId())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Department not found"));

	    User user = User.builder()
	            .username(dto.getUsername())
	            .password(passwordEncoder.encode(dto.getPassword()))
	            .role(dto.getRole())
	            .enabled(true)
	            .build();

	    System.out.println("SERVICE ADDRESS = " + dto.getAddress());

	    Employee employee = Employee.builder()
	            .employeeCode(dto.getEmployeeCode())
	            .firstName(dto.getFirstName())
	            .lastName(dto.getLastName())
	            .email(dto.getEmail())
	            .phoneNumber(dto.getPhoneNumber())
	            .designation(dto.getDesignation())
	            .address(dto.getAddress())
	            .salary(dto.getSalary())
	            .joiningDate(dto.getJoiningDate())
	            .active(true)
	            .department(department)
	            .user(user)
	            .build();

	    System.out.println("ENTITY ADDRESS = " + employee.getAddress());

	    Employee savedEmployee = employeeRepository.save(employee);

	    return employeeMapper.toResponse(savedEmployee);
	}
	public List<EmployeeResponseDTO> getAllEmployees() {

		return employeeRepository.findAll().stream().map(employeeMapper::toResponse).collect(Collectors.toList());
	}

	@Override
	public EmployeeResponseDTO getEmployeeById(Long id) {

		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

		return employeeMapper.toResponse(employee);
	}

	@Override
	@Transactional
	public EmployeeResponseDTO updateEmployee(Long id,
	        EmployeeRequestDTO dto) {

	    Employee employee = employeeRepository.findById(id)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Employee not found"));

	    Department department = departmentRepository.findById(dto.getDepartmentId())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Department not found"));
        employee.setEmployeeCode(dto.getEmployeeCode());
	    employee.setFirstName(dto.getFirstName());
	    employee.setLastName(dto.getLastName());
	    employee.setEmail(dto.getEmail());
	    employee.setPhoneNumber(dto.getPhoneNumber());
	    employee.setAddress(dto.getAddress());
	    employee.setDesignation(dto.getDesignation());
	    employee.setSalary(dto.getSalary());
	    employee.setJoiningDate(dto.getJoiningDate());
	    employee.setDepartment(department);

	    User user = employee.getUser();

	    user.setUsername(dto.getUsername());

	    if (dto.getPassword() != null &&
	            !dto.getPassword().isBlank()) {

	        user.setPassword(
	                passwordEncoder.encode(dto.getPassword()));
	    }

	    user.setRole(dto.getRole());

	    Employee updatedEmployee =
	            employeeRepository.save(employee);

	    return employeeMapper.toResponse(updatedEmployee);
	}

	@Override
	@Transactional
	public void deleteEmployee(Long id) {

	    Employee employee = employeeRepository.findById(id)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Employee not found"));

	    employeeRepository.delete(employee);
	}
	@Override
	public List<EmployeeResponseDTO> searchEmployees(String keyword) {

	    List<Employee> employees = employeeRepository
	            .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCaseOrDesignationContainingIgnoreCase(
	                    keyword,
	                    keyword,
	                    keyword,
	                    keyword,
	                    keyword);

	    return employees.stream()
	            .map(employeeMapper::toResponse)
	            .toList();
	}

	@Override
	public Page<EmployeeResponseDTO> getAllEmployees(int page, int size, String search) {

	    Pageable pageable = PageRequest.of(page, size);

	    Page<Employee> employeePage = employeeRepository.findAll(pageable);

	    return employeePage.map(employeeMapper::toResponse);
	}
	@Override
	public List<EmployeeResponseDTO> saveAll(List<EmployeeRequestDTO> dtoList) {

	    List<Employee> employeeList = dtoList.stream()
	            .map(dto -> {

	                Department department = departmentRepository
	                        .findById(dto.getDepartmentId())
	                        .orElseThrow(() ->
	                                new ResourceNotFoundException(
	                                        "Department not found: " + dto.getDepartmentId()));

	                return employeeMapper.toEntity(dto, department);
	            })
	            .toList();

	    List<Employee> savedEmployees = employeeRepository.saveAll(employeeList);

	    return savedEmployees.stream()
	            .map(employeeMapper::toResponse)
	            .toList();
	}

	public List<EmployeeResponseDTO> filterEmployees(
	        String designation,
	        Boolean active,
	        Double minSalary,
	        Double maxSalary) {

	    Specification<Employee> specification = Specification
	            .where(EmployeeSpecification.hasDesignation(designation))
	            .and(EmployeeSpecification.isActive(active))
	            .and(EmployeeSpecification.salaryGreaterThan(minSalary))
	            .and(EmployeeSpecification.salaryLessThan(maxSalary));

	    List<Employee> employees = employeeRepository.findAll(specification);

	    return employees.stream()
	            .map(employeeMapper::toResponse)
	            .toList();
	}
	@Override
	public EmployeeResponseDTO getMyProfile() {

	    Authentication authentication =
	            SecurityContextHolder
	                    .getContext()
	                    .getAuthentication();

	    String username = authentication.getName();

	    Employee employee = employeeRepository
	            .findByUserUsername(username)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Employee profile not found."));

	    return employeeMapper.toResponse(employee);
	}
}