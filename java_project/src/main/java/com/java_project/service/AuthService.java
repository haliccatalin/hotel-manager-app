package com.java_project.service;

import com.java_project.dto.LoginDto;
import com.java_project.dto.RegisterDto;
import com.java_project.model.Customer;

public interface AuthService {

    Customer login(LoginDto loginDto);
    Customer register(RegisterDto registerDto);
}
