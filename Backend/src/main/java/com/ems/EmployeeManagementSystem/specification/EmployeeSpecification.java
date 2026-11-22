package com.ems.EmployeeManagementSystem.specification;

import org.springframework.data.jpa.domain.Specification;

import com.ems.EmployeeManagementSystem.entity.Employee;

public class EmployeeSpecification {

    public static Specification<Employee> hasDesignation(String designation) {

        return (root, query, cb) ->

                designation == null
                        ? null
                        : cb.equal(root.get("designation"), designation);
    }

    public static Specification<Employee> isActive(Boolean active) {

        return (root, query, cb) ->

                active == null
                        ? null
                        : cb.equal(root.get("active"), active);
    }

    public static Specification<Employee> salaryGreaterThan(Double salary) {

        return (root, query, cb) ->

                salary == null
                        ? null
                        : cb.greaterThanOrEqualTo(root.get("salary"), salary);
    }

    public static Specification<Employee> salaryLessThan(Double salary) {

        return (root, query, cb) ->

                salary == null
                        ? null
                        : cb.lessThanOrEqualTo(root.get("salary"), salary);
    }
}