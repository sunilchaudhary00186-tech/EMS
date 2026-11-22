package com.ems.EmployeeManagementSystem.service;

import java.util.List;

import com.ems.EmployeeManagementSystem.dto.request.PayrollRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.PayrollResponseDTO;
import com.ems.EmployeeManagementSystem.dto.response.PayslipResponseDTO;

public interface PayrollService {

    PayrollResponseDTO generatePayroll(PayrollRequestDTO dto);
    PayslipResponseDTO getPayslip(Long payrollId);
	List<PayslipResponseDTO> getMyPayslips(String username);
}