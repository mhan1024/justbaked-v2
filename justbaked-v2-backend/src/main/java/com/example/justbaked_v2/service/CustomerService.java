package com.example.justbaked_v2.service;

import org.springframework.stereotype.Service;
import com.example.justbaked_v2.model.*;
import com.example.justbaked_v2.repository.*;
import java.util.*;

@Service
public class CustomerService {
	
	private final CustomerRepository cr;
	
	public CustomerService(CustomerRepository cr) {
		this.cr = cr;
	}
	
	public Customer saveCustomer(Customer c) {
		return cr.save(c);
	}
	
	public Optional<Customer> findByUid(String uid) {
		return cr.findCustomerByUid(uid);
	}
	
	public Optional<Customer> findByEmail(String email) {
		return cr.findByEmail(email);
	}
	
	public Optional<Customer> findByDisplayName(String displayName) {
		return cr.findByDisplayName(displayName);
	}
	
	public List<Customer> getAllCustomers() {
		return cr.findAll();
	}
	
	public Customer updateCustomer(String uid, Customer updatedC) {
		// Get customer from DB
		Customer customerDB = cr.findCustomerByUid(uid)
				.orElseThrow(() -> new RuntimeException("Customer does not exist"));
		
		if(Objects.nonNull(updatedC.getDisplayName())) {
			customerDB.setDisplayName(updatedC.getDisplayName());
		}
		
		if(Objects.nonNull(updatedC.getEmail())) {
			customerDB.setDisplayName(updatedC.getEmail());
		}
		
		return cr.save(customerDB);
		
	}

}
