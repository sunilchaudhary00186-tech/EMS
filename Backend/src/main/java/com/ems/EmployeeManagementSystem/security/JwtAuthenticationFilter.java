package com.ems.EmployeeManagementSystem.security;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        System.out.println("JWT REQUEST: "
                + request.getMethod()
                + " "
                + request.getRequestURI());

        System.out.println("AUTH HEADER: " + authHeader);

        // No token
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {

            String username =
                    jwtUtil.extractUsername(token);

            System.out.println(
                    "USERNAME FROM TOKEN: " + username
            );

            if (username != null &&
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(username);

                System.out.println(
                        "AUTHORITIES: "
                        + userDetails.getAuthorities()
                );

                if (jwtUtil.isTokenValid(
                        token,
                        userDetails)) {

                    UsernamePasswordAuthenticationToken
                            authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication
                            );

                    System.out.println(
                            "AUTHENTICATION SUCCESS"
                    );

                    System.out.println(
                            "CURRENT AUTHORITIES: "
                            + SecurityContextHolder
                                    .getContext()
                                    .getAuthentication()
                                    .getAuthorities()
                    );
                }
            }

        } catch (Exception e) {

            System.out.println(
                    "JWT AUTHENTICATION FAILED"
            );

            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}