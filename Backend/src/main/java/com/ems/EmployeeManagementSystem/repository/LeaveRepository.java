package com.ems.EmployeeManagementSystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Leave;
import com.ems.EmployeeManagementSystem.entity.LeaveStatus;

public interface LeaveRepository extends JpaRepository<Leave, Long> {

    List<Leave> findByEmployeeIdOrderByAppliedAtDesc(
            Long employeeId
    );

    List<Leave> findByEmployeeUserUsernameOrderByAppliedAtDesc(
            String username
    );

    long countByStatus(LeaveStatus status);


    // ==========================================
    // CHECK OVERLAPPING LEAVE
    // ==========================================

    @Query("""
        SELECT COUNT(l)
        FROM Leave l
        WHERE l.employee.id = :employeeId
        AND l.status IN ('PENDING', 'APPROVED')
        AND l.startDate <= :endDate
        AND l.endDate >= :startDate
    """)
    long countOverlappingLeaves(
            Long employeeId,
            LocalDate startDate,
            LocalDate endDate
    );


    // ==========================================
    // APPROVED LEAVES
    // ==========================================

    @Query("""
    	    SELECT l
    	    FROM Leave l
    	    WHERE l.employee.id = :employeeId
    	    AND l.status = 'APPROVED'
    	    AND l.startDate <= :endDate
    	    AND l.endDate >= :startDate
    	""")
    	List<Leave> findApprovedLeavesForPeriod(
    	        Long employeeId,
    	        LocalDate startDate,
    	        LocalDate endDate
    	);
}