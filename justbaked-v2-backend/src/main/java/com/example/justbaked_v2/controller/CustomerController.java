package com.example.justbaked_v2.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.justbaked_v2.model.*;
import com.example.justbaked_v2.service.*;
import java.util.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {
	
private final CustomerService cs;
	
	public CustomerController(CustomerService cs) {
		this.cs = cs;
	}
	
	@GetMapping("/protected")
	public ResponseEntity<?> protectedEndpoint(@RequestHeader("Authorization") String authHeader) {
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid Authorization header");
        }
		
		String idToken = authHeader.substring(7);
		
		try {
			FirebaseToken fbToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
			String uid = fbToken.getUid();
			String email = fbToken.getEmail();
			String displayName = fbToken.getName();
			
			Optional<Customer> existingCustomer = cs.findByUid(uid);
			Customer customer;
			
			if (existingCustomer.isPresent()) {
				customer = existingCustomer.get();
			} else {
				customer = new Customer(uid, email, displayName);
				customer = cs.saveCustomer(customer);
			}

			return ResponseEntity.ok(customer);
			
		} catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid ID token");
		}
	}
	
	@PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestHeader("Authorization") String authHeader,
    									  @RequestBody Map<String, String> userData) throws Exception {
		
		String idToken = authHeader.replace("Bearer ", "");
		FirebaseToken fbToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
		
		String uid = fbToken.getUid();
		String email = fbToken.getEmail();
		String displayName = userData.get("displayName");
		
		Optional<Customer> existingCustomer = cs.findByUid(uid);
		if (existingCustomer.isPresent()) {
			return ResponseEntity.ok(existingCustomer.get());
		}
		
		Customer newCustomer = new Customer(uid, email, displayName);
		newCustomer = cs.saveCustomer(newCustomer);
		
		return ResponseEntity.ok(newCustomer);
		
	}
	
	@GetMapping
	public List<Customer> getAllCustomers(){
		return cs.getAllCustomers();
	}
	
	@GetMapping("/customer-id/{uid}") 
	public ResponseEntity<Customer> getCustomerByUid(@PathVariable String uid) {
		return cs.findByUid(uid)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/customer-email/{email}") 
	public ResponseEntity<Customer> getCustomerByUID(@PathVariable String email) {
		return cs.findByEmail(email)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/customer-display/{displayName}") 
	public ResponseEntity<Customer> getCustomerByDisplayName(@PathVariable String displayName) {
		return cs.findByDisplayName(displayName)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping
	public Customer createCustomer(@RequestBody Customer c) {
		// Check if the customer is already in the DB
		Optional<Customer> customer = cs.findByDisplayName(c.getDisplayName());
		
		if (customer.isPresent()) {
			// If customer exists, return the customer from the DB
			return customer.get();
		}
		
		// Otherwise, save the customer
		return cs.saveCustomer(c);
	}
	
}
