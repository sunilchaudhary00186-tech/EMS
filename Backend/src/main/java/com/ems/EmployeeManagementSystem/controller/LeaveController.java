package com.ems.EmployeeManagementSystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ems.EmployeeManagementSystem.dto.request.LeaveRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.LeaveResponseDTO;
import com.ems.EmployeeManagementSystem.service.LeaveService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping("/apply")
    public ResponseEntity<LeaveResponseDTO> applyLeave(
            @Valid @RequestBody LeaveRequestDTO dto) {

        return ResponseEntity.ok(
                leaveService.applyLeave(dto)
        );
    }

    @GetMapping("/my")
    public ResponseEntity<List<LeaveResponseDTO>> getMyLeaves() {

        return ResponseEntity.ok(
                leaveService.getMyLeaves()
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<LeaveResponseDTO>> getAllLeaves() {

        return ResponseEntity.ok(
                leaveService.getAllLeaves()
        );
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<LeaveResponseDTO> approveLeave(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leaveService.approveLeave(id)
        );
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<LeaveResponseDTO> rejectLeave(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leaveService.rejectLeave(id)
        );
    }
}