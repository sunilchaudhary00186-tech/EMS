package com.ems.EmployeeManagementSystem.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payroll")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // January
    @Column(nullable = false)
    private int month;

    // 2026
    @Column(nullable = false)
    private Integer year;

    // Employee Salary
    @Column(nullable = false)
    private Double basicSalary;

    // Extra amount
    @Builder.Default
    private Double bonus = 0.0;

    // Salary deduction
    @Builder.Default
    private Double deductions = 0.0;

    // Final Salary
    @Column(nullable = false)
    private Double netSalary;
    
    private Integer workingDays;

    private Integer presentDays;

    private Integer paidLeaves;

    private Integer lossOfPayDays;

    private Double dailySalary;

    // Payroll Generated Date
    private LocalDate generatedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @PrePersist
    public void prePersist() {
        generatedDate = LocalDate.now();
    }
}