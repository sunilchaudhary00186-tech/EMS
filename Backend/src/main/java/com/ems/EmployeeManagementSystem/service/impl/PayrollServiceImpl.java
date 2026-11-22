
package com.ems.EmployeeManagementSystem.service.impl;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ems.EmployeeManagementSystem.dto.request.PayrollRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.PayrollResponseDTO;
import com.ems.EmployeeManagementSystem.dto.response.PayslipResponseDTO;
import com.ems.EmployeeManagementSystem.entity.AttendanceStatus;
import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Leave;
import com.ems.EmployeeManagementSystem.entity.Payroll;
import com.ems.EmployeeManagementSystem.exception.DuplicateResourceException;
import com.ems.EmployeeManagementSystem.exception.ResourceNotFoundException;
import com.ems.EmployeeManagementSystem.mapper.PayrollMapper;
import com.ems.EmployeeManagementSystem.repository.AttendanceRepository;
import com.ems.EmployeeManagementSystem.repository.EmployeeRepository;
import com.ems.EmployeeManagementSystem.repository.LeaveRepository;
import com.ems.EmployeeManagementSystem.repository.PayrollRepository;
import com.ems.EmployeeManagementSystem.service.PayrollService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PayrollServiceImpl implements PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;
    private final PayrollMapper payrollMapper;

    // =====================================================
    // GENERATE PAYROLL
    // =====================================================

    @Override
    @Transactional
    public PayrollResponseDTO generatePayroll(PayrollRequestDTO dto) {

        // 1. FIND EMPLOYEE

        Employee employee = employeeRepository
                .findById(dto.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found"
                        )
                );

        // 2. VALIDATE MONTH AND YEAR

        YearMonth yearMonth;

        try {
            yearMonth = YearMonth.of(
                    dto.getYear(),
                    dto.getMonth()
            );
        } catch (java.time.DateTimeException ex) {
            throw new IllegalArgumentException(
                    "Invalid payroll month or year"
            );
        }

        // 3. CHECK DUPLICATE PAYROLL

        payrollRepository.findByEmployeeAndMonthAndYear(
                employee,
                dto.getMonth(),
                dto.getYear()
        ).ifPresent(payroll -> {
            throw new DuplicateResourceException(
                    "Payroll already generated"
            );
        });

        // 4. BASIC SALARY

        double basicSalary = employee.getSalary();

        if (!Double.isFinite(basicSalary) || basicSalary < 0) {
            throw new IllegalArgumentException(
                    "Employee salary must be a valid non-negative amount"
            );
        }

        // 5. MONTH DATE RANGE

        LocalDate monthStart = yearMonth.atDay(1);
        LocalDate monthEnd = yearMonth.atEndOfMonth();

        // 6. CALCULATE WORKING DAYS
        // Monday to Friday are working days.

        int workingDays = 0;

        for (int day = 1;
             day <= yearMonth.lengthOfMonth();
             day++) {

            LocalDate date = yearMonth.atDay(day);

            if (date.getDayOfWeek().getValue() <= 5) {
                workingDays++;
            }
        }

        if (workingDays == 0) {
            throw new IllegalStateException(
                    "No working days found for payroll month"
            );
        }

        // 7. COUNT PRESENT DAYS

        long presentDays = attendanceRepository.countPresentDays(
                employee.getId(),
                AttendanceStatus.PRESENT,
                monthStart,
                monthEnd
        );

        if (presentDays < 0 || presentDays > workingDays) {
            throw new IllegalStateException(
                    "Invalid attendance count for payroll"
            );
        }

        // 8. FETCH APPROVED LEAVES FOR THE MONTH

        List<Leave> approvedLeaves =
                leaveRepository.findApprovedLeavesForPeriod(
                        employee.getId(),
                        monthStart,
                        monthEnd
                );

        // 9. CALCULATE APPROVED PAID LEAVE DAYS
        // This assumes every approved leave is paid.

        long paidLeaves = 0;

        for (Leave leave : approvedLeaves) {

            LocalDate start = leave.getStartDate().isBefore(monthStart)
                    ? monthStart
                    : leave.getStartDate();

            LocalDate end = leave.getEndDate().isAfter(monthEnd)
                    ? monthEnd
                    : leave.getEndDate();

            for (LocalDate date = start;
                 !date.isAfter(end);
                 date = date.plusDays(1)) {

                if (date.getDayOfWeek().getValue() <= 5) {
                    paidLeaves++;
                }
            }
        }

        // 10. CALCULATE PAYABLE DAYS

        long payableDays = Math.min(
                presentDays + paidLeaves,
                workingDays
        );

        // 11. CALCULATE LOSS OF PAY DAYS

        long lossOfPay = Math.max(
                0L,
                workingDays - payableDays
        );

        // 12. CALCULATE DAILY SALARY

        double dailySalary = basicSalary / workingDays;

        // 13. BONUS

        double bonus = dto.getBonus() == null
                ? 0.0
                : dto.getBonus();

        // 14. OTHER DEDUCTIONS

        double otherDeduction = dto.getDeductions() == null
                ? 0.0
                : dto.getDeductions();

        if (!Double.isFinite(bonus) || bonus < 0) {
            throw new IllegalArgumentException(
                    "Bonus must be a valid non-negative amount"
            );
        }

        if (!Double.isFinite(otherDeduction)
                || otherDeduction < 0) {
            throw new IllegalArgumentException(
                    "Deductions must be a valid non-negative amount"
            );
        }

        // 15. CALCULATE NET SALARY
        // Requested formula: Basic Salary + Bonus - Other Deductions.
        // Loss of Pay is intentionally not deducted in this formula.

        double netSalary = Math.max(
                0.0,
                basicSalary + bonus - otherDeduction
        );

        // 16. CREATE PAYROLL

        Payroll payroll = Payroll.builder()
                .employee(employee)
                .month(dto.getMonth())
                .year(dto.getYear())
                .basicSalary(basicSalary)
                .dailySalary(dailySalary)
                .workingDays(workingDays)
                .presentDays((int) presentDays)
                .paidLeaves((int) paidLeaves)
                .lossOfPayDays((int) lossOfPay)
                .bonus(bonus)
                .deductions(otherDeduction)
                .netSalary(netSalary)
                .build();

        // 17. SAVE PAYROLL

        Payroll savedPayroll = payrollRepository.save(payroll);

        // 18. RETURN RESPONSE

        return payrollMapper.toResponse(savedPayroll);
    }

    // =====================================================
    // GET MY PAYSLIPS
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public List<PayslipResponseDTO> getMyPayslips(String username) {

        Employee employee = employeeRepository
                .findByUserUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found"
                        )
                );

        List<Payroll> payrolls =
                payrollRepository.findByEmployee(employee);

        return payrolls.stream()
                .map(payroll -> PayslipResponseDTO.builder()
                        .payrollId(payroll.getId())
                        .employeeName(
                                employee.getFirstName()
                                        + " "
                                        + employee.getLastName()
                        )
                        .employeeCode(employee.getEmployeeCode())
                        .department(
                                employee.getDepartment()
                                        .getDepartmentName()
                        )
                        .designation(employee.getDesignation())
                        .month(payroll.getMonth())
                        .year(payroll.getYear())
                        .basicSalary(payroll.getBasicSalary())
                        .dailySalary(payroll.getDailySalary())
                        .workingDays(payroll.getWorkingDays())
                        .presentDays(payroll.getPresentDays())
                        .paidLeaves(payroll.getPaidLeaves())
                        .lossOfPayDays(payroll.getLossOfPayDays())
                        .bonus(payroll.getBonus())
                        .deductions(payroll.getDeductions())
                        .netSalary(payroll.getNetSalary())
                        .build()
                )
                .toList();
    }

    // =====================================================
    // GET PAYSLIP BY PAYROLL ID
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public PayslipResponseDTO getPayslip(Long payrollId) {

        Payroll payroll = payrollRepository
                .findById(payrollId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payroll not found"
                        )
                );

        Employee employee = payroll.getEmployee();

        return PayslipResponseDTO.builder()
                .payrollId(payroll.getId())
                .employeeCode(employee.getEmployeeCode())
                .employeeName(
                        employee.getFirstName()
                                + " "
                                + employee.getLastName()
                )
                .designation(employee.getDesignation())
                .department(
                        employee.getDepartment()
                                .getDepartmentName()
                )
                .month(payroll.getMonth())
                .year(payroll.getYear())
                .basicSalary(payroll.getBasicSalary())
                .dailySalary(payroll.getDailySalary())
                .workingDays(payroll.getWorkingDays())
                .presentDays(payroll.getPresentDays())
                .paidLeaves(payroll.getPaidLeaves())
                .lossOfPayDays(payroll.getLossOfPayDays())
                .bonus(payroll.getBonus())
                .deductions(payroll.getDeductions())
                .netSalary(payroll.getNetSalary())
                .build();
    }
}
