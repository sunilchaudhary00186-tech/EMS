package com.ems.EmployeeManagementSystem.mapper;

import org.springframework.stereotype.Component;

import com.ems.EmployeeManagementSystem.dto.request.EmployeeRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.EmployeeResponseDTO;
import com.ems.EmployeeManagementSystem.entity.Department;
import com.ems.EmployeeManagementSystem.entity.Employee;

@Component
public class EmployeeMapper {

    public static Employee toEntity(EmployeeRequestDTO request, Department department) {

        Employee employee = new Employee();
        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhoneNumber(request.getPhoneNumber());
        employee.setSalary(request.getSalary());
        employee.setAddress(request.getAddress());
        employee.setDesignation(request.getDesignation());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setDepartment(department);

        return employee;
    }

    public EmployeeResponseDTO toResponse(Employee employee) {

        EmployeeResponseDTO response = new EmployeeResponseDTO();
       response.setEmployeeCode(employee.getEmployeeCode());
        response.setId(employee.getId());
        response.setFirstName(employee.getFirstName());
        response.setLastName(employee.getLastName());
        response.setEmail(employee.getEmail());
        response.setPhoneNumber(employee.getPhoneNumber());
        response.setSalary(employee.getSalary());
        response.setAddress(employee.getAddress());
        response.setDesignation(employee.getDesignation());
        response.setJoiningDate(employee.getJoiningDate());

        if (employee.getDepartment() != null) {
            response.setDepartmentName(employee.getDepartment().getDepartmentName());
        }

        return EmployeeResponseDTO.builder()

                .id(employee.getId())

                .employeeCode(employee.getEmployeeCode())

                .firstName(employee.getFirstName())

                .lastName(employee.getLastName())

                .email(employee.getEmail())

                .phoneNumber(employee.getPhoneNumber())

                .designation(employee.getDesignation())

                .salary(employee.getSalary())

                .address(employee.getAddress())

                .joiningDate(employee.getJoiningDate())

                .active(employee.getActive())

                .departmentName(
                        employee.getDepartment() != null
                                ? employee.getDepartment().getDepartmentName()
                                : null
                )

                .departmentId(
                        employee.getDepartment() != null
                                ? employee.getDepartment().getId()
                                : null
                )

                .username(
                        employee.getUser() != null
                                ? employee.getUser().getUsername()
                                : null
                )

                .role(
                        employee.getUser() != null
                                ? employee.getUser().getRole()
                                : null
                )

                .build();

}
}