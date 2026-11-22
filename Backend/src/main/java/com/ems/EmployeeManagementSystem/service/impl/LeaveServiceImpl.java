package com.ems.EmployeeManagementSystem.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ems.EmployeeManagementSystem.dto.request.LeaveRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.LeaveResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Leave;
import com.ems.EmployeeManagementSystem.entity.LeaveStatus;
import com.ems.EmployeeManagementSystem.exception.ResourceNotFoundException;
import com.ems.EmployeeManagementSystem.mapper.LeaveMapper;
import com.ems.EmployeeManagementSystem.repository.EmployeeRepository;
import com.ems.EmployeeManagementSystem.repository.LeaveRepository;
import com.ems.EmployeeManagementSystem.service.LeaveService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;

    private final EmployeeRepository employeeRepository;

    private final LeaveMapper leaveMapper;


    // =====================================================
    // GET CURRENT USERNAME
    // =====================================================

    private String getCurrentUsername() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new RuntimeException(
                    "User is not authenticated"
            );
        }

        return authentication.getName();
    }


    // =====================================================
    // APPLY LEAVE
    // =====================================================

    @Override
    public LeaveResponseDTO applyLeave(
            LeaveRequestDTO dto) {

        String username =
                getCurrentUsername();


        // ---------------------------------------------
        // FIND EMPLOYEE
        // ---------------------------------------------

        Employee employee =
                employeeRepository
                        .findByUserUsername(username)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found"
                                )
                        );


        // ---------------------------------------------
        // VALIDATE DATE RANGE
        // ---------------------------------------------

        if (dto.getEndDate()
                .isBefore(dto.getStartDate())) {

            throw new IllegalArgumentException(
                    "End date cannot be before start date"
            );
        }


        // ---------------------------------------------
        // CHECK OVERLAPPING LEAVE
        // ---------------------------------------------

        long overlappingLeaves =
                leaveRepository.countOverlappingLeaves(
                        employee.getId(),
                        dto.getStartDate(),
                        dto.getEndDate()
                );

        if (overlappingLeaves > 0) {

            throw new IllegalArgumentException(
                    "You already have a pending or approved leave for these dates"
            );
        }


        // ---------------------------------------------
        // CREATE LEAVE
        // ---------------------------------------------

        Leave leave =
                Leave.builder()

                        .employee(employee)

                        .leaveType(
                                dto.getLeaveType()
                        )

                        .startDate(
                                dto.getStartDate()
                        )

                        .endDate(
                                dto.getEndDate()
                        )

                        .reason(
                                dto.getReason()
                        )

                        .status(
                                LeaveStatus.PENDING
                        )

                        .build();


        // ---------------------------------------------
        // SAVE
        // ---------------------------------------------

        Leave savedLeave =
                leaveRepository.save(leave);


        return leaveMapper.toResponse(
                savedLeave
        );
    }


    // =====================================================
    // GET MY LEAVES
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public List<LeaveResponseDTO> getMyLeaves() {

        String username =
                getCurrentUsername();

        return leaveRepository
                .findByEmployeeUserUsernameOrderByAppliedAtDesc(
                        username
                )
                .stream()
                .map(leaveMapper::toResponse)
                .toList();
    }


    // =====================================================
    // GET ALL LEAVES
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public List<LeaveResponseDTO> getAllLeaves() {

        return leaveRepository
                .findAll()
                .stream()
                .sorted(
                    (a, b) ->
                        b.getAppliedAt()
                         .compareTo(a.getAppliedAt())
                )
                .map(leaveMapper::toResponse)
                .toList();
    }


    // =====================================================
    // APPROVE LEAVE
    // =====================================================

    @Override
    public LeaveResponseDTO approveLeave(
            Long id) {

        Leave leave =
                leaveRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Leave not found"
                                )
                        );


        // ---------------------------------------------
        // ONLY PENDING CAN BE APPROVED
        // ---------------------------------------------

        if (leave.getStatus()
                != LeaveStatus.PENDING) {

            throw new IllegalArgumentException(
                    "Only pending leaves can be approved"
            );
        }


        leave.setStatus(
                LeaveStatus.APPROVED
        );


        Leave savedLeave =
                leaveRepository.save(leave);


        return leaveMapper.toResponse(
                savedLeave
        );
    }


    // =====================================================
    // REJECT LEAVE
    // =====================================================

    @Override
    public LeaveResponseDTO rejectLeave(
            Long id) {

        Leave leave =
                leaveRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Leave not found"
                                )
                        );


        // ---------------------------------------------
        // ONLY PENDING CAN BE REJECTED
        // ---------------------------------------------

        if (leave.getStatus()
                != LeaveStatus.PENDING) {

            throw new IllegalArgumentException(
                    "Only pending leaves can be rejected"
            );
        }


        leave.setStatus(
                LeaveStatus.REJECTED
        );


        Leave savedLeave =
                leaveRepository.save(leave);


        return leaveMapper.toResponse(
                savedLeave
        );
    }
}