package com.ems.EmployeeManagementSystem.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private String designation;

    @Column(nullable = false)
    private double salary;

    @Column(nullable = false)
    private LocalDate joiningDate;

    @Column(nullable = false)
    private Boolean active = true;

    private String address;

    private String profileImage;

    /*
     * MANY EMPLOYEES -> ONE DEPARTMENT
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    /*
     * ONE EMPLOYEE -> MANY LEAVES
     */
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Leave> leaves;

    
    @Column(name = "employee_code", unique = true)
    private String employeeCode;
    
    /*
     * ONE EMPLOYEE -> ONE USER
     */
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    
    @OneToMany(
            mappedBy = "employee",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Attendance> attendances = new ArrayList<>();
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
	
}