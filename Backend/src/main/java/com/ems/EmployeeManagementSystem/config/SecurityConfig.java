package com.ems.EmployeeManagementSystem.config;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfigurationSource;

import com.ems.EmployeeManagementSystem.security.JwtAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final UserDetailsService userDetailsService;

    private final PasswordEncoder passwordEncoder;

    private final CorsConfigurationSource corsConfigurationSource;


    // =========================================================
    // AUTHENTICATION PROVIDER
    // =========================================================

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();

        provider.setUserDetailsService(
                userDetailsService
        );

        provider.setPasswordEncoder(
                passwordEncoder
        );

        return provider;
    }


    // =========================================================
    // AUTHENTICATION MANAGER
    // =========================================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }


    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

        http

            // CORS
            .cors(cors ->
                    cors.configurationSource(
                            corsConfigurationSource
                    )
            )

            // CSRF
            .csrf(AbstractHttpConfigurer::disable)

            // Basic Auth
            .httpBasic(
                    AbstractHttpConfigurer::disable
            )

            // Form Login
            .formLogin(
                    AbstractHttpConfigurer::disable
            )

            // Stateless JWT
            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            // =================================================
            // AUTHORIZATION
            // =================================================

            .authorizeHttpRequests(auth -> auth

                // ---------------------------------------------
                // AUTH
                // ---------------------------------------------

                .requestMatchers(
                        "/api/auth/**"
                ).permitAll()

                .requestMatchers(
                	    HttpMethod.PUT,
                	    "/api/users/change-password"
                	).hasRole("EMPLOYEE")
                // ---------------------------------------------
                // DASHBOARDS
                // ---------------------------------------------

                .requestMatchers(
                        "/api/dashboard/admin"
                ).hasRole("ADMIN")

                .requestMatchers(
                        "/api/dashboard/hr"
                ).hasRole("HR")

                .requestMatchers(
                        "/api/dashboard/employee"
                ).hasRole("EMPLOYEE")


                // ---------------------------------------------
                // REPORTS
                // ---------------------------------------------

                .requestMatchers(
                        "/api/reports/**"
                ).hasAnyRole(
                        "ADMIN",
                        "HR"
                )


                // ---------------------------------------------
                // EMPLOYEES
                // ---------------------------------------------

                .requestMatchers(
                        HttpMethod.POST,
                        "/api/employees"
                ).hasAnyRole(
                        "ADMIN",
                        "HR"
                )

                .requestMatchers(
                        HttpMethod.PUT,
                        "/api/employees/**"
                ).hasAnyRole(
                        "ADMIN",
                        "HR"
                )

                .requestMatchers(
                        HttpMethod.DELETE,
                        "/api/employees/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                        HttpMethod.GET,
                        "/api/employees/profile"
                ).hasRole("EMPLOYEE")

                .requestMatchers(
                        HttpMethod.GET,
                        "/api/employees"
                ).hasAnyRole(
                        "ADMIN",
                        "HR"
                )

                .requestMatchers(
                        HttpMethod.GET,
                        "/api/employees/*"
                ).hasAnyRole(
                        "ADMIN",
                        "HR"
                )

             // =============================================
             // LEAVES
             // =============================================

             // Employee → Apply Leave
             .requestMatchers(
                     HttpMethod.POST,
                     "/api/leaves/apply"
             )
             .hasRole("EMPLOYEE")

             // Employee → View Own Leaves
             .requestMatchers(
                     HttpMethod.GET,
                     "/api/leaves/my"
             )
             .hasRole("EMPLOYEE")

             // HR + ADMIN → View All Leaves
             .requestMatchers(
                     HttpMethod.GET,
                     "/api/leaves/all"
             )
             .hasAnyRole("HR", "ADMIN")

             // HR + ADMIN → Approve Leave
             .requestMatchers(
                     HttpMethod.PUT,
                     "/api/leaves/*/approve"
             )
             .hasAnyRole("HR", "ADMIN")

             // HR + ADMIN → Reject Leave
             .requestMatchers(
                     HttpMethod.PUT,
                     "/api/leaves/*/reject"
             )
             .hasAnyRole("HR", "ADMIN")

          // =============================================
          // ATTENDANCE
          // =============================================

          // Employee → Check In
          .requestMatchers(
                  HttpMethod.POST,
                  "/api/attendance/check-in"
          )
          .hasRole("EMPLOYEE")

          // Employee → Check Out
          .requestMatchers(
                  HttpMethod.PUT,
                  "/api/attendance/check-out"
          )
          .hasRole("EMPLOYEE")

          // Employee → Own Attendance
          .requestMatchers(
                  HttpMethod.GET,
                  "/api/attendance/my"
          )
          .hasRole("EMPLOYEE")

          // HR + ADMIN → All Attendance
          .requestMatchers(
                  HttpMethod.GET,
                  "/api/attendance/all"
          )
          .hasAnyRole("HR", "ADMIN")
       // ---------------------------------------------
       // PAYROLL
       // ---------------------------------------------

       // Employee → View Own Payslip
       .requestMatchers(
               HttpMethod.GET,
               "/api/payroll/my"
       )
       .hasRole("EMPLOYEE")

       // ADMIN + HR → Payroll APIs
       .requestMatchers(
               "/api/payroll/**"
       )
       .hasAnyRole(
               "ADMIN",
               "HR"
       )


                // ---------------------------------------------
                // DEPARTMENTS
                // ---------------------------------------------

                .requestMatchers(
                        HttpMethod.GET,
                        "/api/departments/**"
                ).hasAnyRole(
                        "ADMIN",
                        "HR",
                        "EMPLOYEE"
                )

                .requestMatchers(
                        HttpMethod.POST,
                        "/api/departments"
                ).hasAnyRole(
                        "ADMIN",
                        "HR"
                )

                .requestMatchers(
                        HttpMethod.PUT,
                        "/api/departments/**"
                ).hasAnyRole(
                        "ADMIN",
                        "HR"
                )

                .requestMatchers(
                        HttpMethod.DELETE,
                        "/api/departments/**"
                ).hasRole("ADMIN")


                // ---------------------------------------------
                // PERFORMANCE
                // ---------------------------------------------

                .requestMatchers(
                        "/api/performance/**"
                ).hasAnyRole(
                        "ADMIN",
                        "HR"
                )


                // ---------------------------------------------
                // PROMOTIONS
                // ---------------------------------------------

                .requestMatchers(
                        "/api/promotions/**"
                ).hasAnyRole(
                        "ADMIN",
                        "HR"
                )


                // ---------------------------------------------
                // EVERYTHING ELSE
                // ---------------------------------------------

                .anyRequest()
                .authenticated()
            )

            // Authentication Provider
            .authenticationProvider(
                    authenticationProvider()
            )

            // JWT Filter
            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}