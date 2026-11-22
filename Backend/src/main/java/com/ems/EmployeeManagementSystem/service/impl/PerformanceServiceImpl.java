package com.ems.EmployeeManagementSystem.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ems.EmployeeManagementSystem.dto.request.PerformanceRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.PerformanceResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Performance;
import com.ems.EmployeeManagementSystem.exception.DuplicateResourceException;
import com.ems.EmployeeManagementSystem.exception.ResourceNotFoundException;
import com.ems.EmployeeManagementSystem.mapper.PerformanceMapper;
import com.ems.EmployeeManagementSystem.repository.EmployeeRepository;
import com.ems.EmployeeManagementSystem.repository.PerformanceRepository;
import com.ems.EmployeeManagementSystem.service.PerformanceService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PerformanceServiceImpl
        implements PerformanceService {

    private final PerformanceRepository performanceRepository;

    private final EmployeeRepository employeeRepository;

    private final PerformanceMapper performanceMapper;

    @Override
    public PerformanceResponseDTO addPerformanceReview(
            PerformanceRequestDTO dto) {

        Employee employee =
                employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found"));

        boolean exists =
                performanceRepository
                .existsByEmployeeIdAndReviewDate(
                        employee.getId(),
                        dto.getReviewDate());

        if (exists) {
            throw new DuplicateResourceException(
                    "Performance review already exists for this date");
        }

        Performance performance = Performance.builder()
                .employee(employee)
                .rating(dto.getRating())
                .comments(dto.getComments())
                .reviewDate(dto.getReviewDate())
                .reviewedBy(dto.getReviewedBy())
                .build();

        Performance saved =
                performanceRepository.save(performance);

        return performanceMapper.toResponse(saved);
    }

	@Override
	public List<PerformanceResponseDTO> getAllReviews() {
		// TODO Auto-generated method stub
		return performanceRepository
				.findAll()
				.stream()
				.map(performanceMapper::toResponse)
				.toList();
	}

	@Override
	public List<PerformanceResponseDTO> getReviewsByEmployee(
	        Long employeeId) {

	    employeeRepository.findById(employeeId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Employee not found"));

	    return performanceRepository
	            .findByEmployeeId(employeeId)
	            .stream()
	            .map(performanceMapper::toResponse)
	            .toList();
	}
	@Override
	public PerformanceResponseDTO updateReview(
	        Long reviewId,
	        PerformanceRequestDTO dto) {

	    Performance performance =
	            performanceRepository.findById(reviewId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Performance review not found"));

	    Employee employee =
	            employeeRepository.findById(dto.getEmployeeId())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Employee not found"));

	    performance.setEmployee(employee);

	    performance.setRating(dto.getRating());

	    performance.setComments(dto.getComments());

	    performance.setReviewDate(dto.getReviewDate());

	    performance.setReviewedBy(dto.getReviewedBy());

	    Performance updated =
	            performanceRepository.save(performance);

	    return performanceMapper.toResponse(updated);
	}
	@Override
	public void deleteReview(Long reviewId) {

	    Performance performance =
	            performanceRepository.findById(reviewId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Performance review not found"));

	    performanceRepository.delete(performance);
	}
}