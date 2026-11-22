package com.ems.EmployeeManagementSystem.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ems.EmployeeManagementSystem.entity.Attendance;
import com.ems.EmployeeManagementSystem.entity.AttendanceStatus;
import com.ems.EmployeeManagementSystem.entity.Employee;

public interface AttendanceRepository
extends JpaRepository<Attendance, Long> {

Optional<Attendance> findByEmployeeAndAttendanceDate(
    Employee employee,
    LocalDate attendanceDate);

List<Attendance> findByEmployee(Employee employee);

List<Attendance> findByAttendanceDate(LocalDate attendanceDate);
@Query("""
SELECT COUNT(a)
FROM Attendance a
WHERE a.employee.id = :employeeId
AND a.status = 'PRESENT'
AND MONTH(a.attendanceDate) = :month
AND YEAR(a.attendanceDate) = :year
""")
long countPresentDays(
        Long employeeId,
        int month,
        int year);
@Query("""
	       SELECT AVG(a.workingHours)
	       FROM Attendance a
	       WHERE a.workingHours IS NOT NULL
	       """)
	Double getAverageWorkingHours();

long countByStatus(AttendanceStatus status);


@Query("""
    SELECT COUNT(a)
    FROM Attendance a
    WHERE a.employee.id = :employeeId
    AND a.status = :status
    AND a.attendanceDate >= :startDate
    AND a.attendanceDate <= :endDate
""")
long countPresentDays(
        Long employeeId,
        AttendanceStatus status,
        LocalDate startDate,
        LocalDate endDate
);


} 
