package com.ems.EmployeeManagementSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ems.EmployeeManagementSystem.entity.Employee;
import com.ems.EmployeeManagementSystem.entity.Payroll;

public interface PayrollRepository
        extends JpaRepository<Payroll, Long> {

    List<Payroll> findByEmployee(Employee employee);

    Optional<Payroll> findByEmployeeAndMonthAndYear(
            Employee employee,
            Integer month,
            Integer year);


    // ==========================================
    // BASIC SALARY
    // ==========================================

    @Query("""
           SELECT COALESCE(SUM(p.basicSalary),0)
           FROM Payroll p
           """)
    Double getTotalBasicSalary();


    @Query("""
           SELECT COALESCE(AVG(p.basicSalary),0)
           FROM Payroll p
           """)
    Double getAverageBasicSalary();


    @Query("""
           SELECT COALESCE(MAX(p.basicSalary),0)
           FROM Payroll p
           """)
    Double getHighestBasicSalary();


    @Query("""
           SELECT COALESCE(MIN(p.basicSalary),0)
           FROM Payroll p
           """)
    Double getLowestBasicSalary();


    // ==========================================
    // NET SALARY
    // ==========================================

    @Query("""
           SELECT COALESCE(SUM(p.netSalary),0)
           FROM Payroll p
           """)
    Double getTotalNetSalary();


    @Query("""
           SELECT COALESCE(AVG(p.netSalary),0)
           FROM Payroll p
           """)
    Double getAverageNetSalary();


    @Query("""
           SELECT COALESCE(MAX(p.netSalary),0)
           FROM Payroll p
           """)
    Double getHighestNetSalary();


    @Query("""
           SELECT COALESCE(MIN(p.netSalary),0)
           FROM Payroll p
           """)
    Double getLowestNetSalary();
}