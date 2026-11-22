package com.ems.EmployeeManagementSystem.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.EmployeeManagementSystem.dto.request.ChangePasswordRequestDTO;
import com.ems.EmployeeManagementSystem.dto.response.UserResponseDTO;
import com.ems.EmployeeManagementSystem.entity.User;
import com.ems.EmployeeManagementSystem.exception.InvalidPasswordException;
import com.ems.EmployeeManagementSystem.exception.ResourceNotFoundException;
import com.ems.EmployeeManagementSystem.repository.UserRepository;
import com.ems.EmployeeManagementSystem.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

    @Override
    public UserResponseDTO getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .role(user.getRole())
                .enabled(user.getEnabled())
                .build();
    }
    @Override
    public void changePassword(ChangePasswordRequestDTO dto) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

    	  if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
              throw new InvalidPasswordException("Old password is incorrect");
          }

          if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
              throw new InvalidPasswordException("Passwords do not match");
          }
             user.setPassword(
                     passwordEncoder.encode(dto.getNewPassword()));
             userRepository.save(user);

      }
}