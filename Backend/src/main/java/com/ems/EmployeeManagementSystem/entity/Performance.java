package com.ems.EmployeeManagementSystem.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "performance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = false, length = 500)
    private String comments;

    @Column(nullable = false)
    private LocalDate reviewDate;

    @Column(nullable = false)
    private String reviewedBy;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}