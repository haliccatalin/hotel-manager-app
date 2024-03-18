package com.java_project.service;

import com.java_project.model.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<Customer> getAllCustomers();
    Optional<Customer> getCustomerById(Long id);
    Customer saveCustomer(Customer customer);
    Customer updateCustomer(Customer customer);
    void deleteCustomerById(Long id);
    List<Customer> getCustomersByName(String name);

}
