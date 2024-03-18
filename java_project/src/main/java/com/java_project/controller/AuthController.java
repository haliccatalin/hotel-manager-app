package com.java_project.controller;

import com.java_project.dto.LoginDto;
import com.java_project.dto.RegisterDto;
import com.java_project.model.Customer;
import com.java_project.service.AuthService;
import com.java_project.utils.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginDto loginDto) {
        Customer customer = authService.login(loginDto);

        return ResponseEntity.ok(ApiResponse.success("Welcome " + customer.getName(), customer));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterDto registerDto) {
        authService.register(registerDto);

        return ResponseEntity.ok(ApiResponse.success("Register with success", null));
    }
}
