package com.example.justbaked_v2.controller;

import org.springframework.web.bind.annotation.*;
import com.example.justbaked_v2.model.*;
import com.example.justbaked_v2.service.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/customer-orders")
public class CustomerOrderController {
	
	private final CustomerOrderService cos;
	private final CustomerService cs;
	
	public CustomerOrderController(CustomerOrderService cos, CustomerService cs) {
		this.cos = cos;
		this.cs = cs;
	}
	
	@PostMapping
    public CustomerOrder createOrder(@RequestBody CustomerOrder orderRequest) {
        return cos.createOrder(orderRequest);
    }
	
	@GetMapping
    public List<CustomerOrder> getAllOrders() {
        return cos.getAllOrders();
    }
	
	@GetMapping("/customer/{uid}")
    public List<CustomerOrder> getOrdersByCustomer(@PathVariable String uid) {
		Customer customer = cs.findByUid(uid)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

        return cos.getOrdersByCustomer(customer);
    }
	
	@GetMapping("/{id}")
    public CustomerOrder getOrderById(@PathVariable Integer id) {
        return cos.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
	
	@PutMapping("/{id}")
	public CustomerOrder updateOrderStatus(@PathVariable Integer id, @RequestBody Map<String, String> updates) {
		CustomerOrder order = cos.findById(id)
		        .orElseThrow(() -> new RuntimeException("Order not found"));

		if (updates.containsKey("status")) {
			order.setStatus(updates.get("status"));
		}

		return cos.createOrder(order);
	}
	
	@DeleteMapping("/{id}")
	public void deleteOrder(@PathVariable Integer id) {
		cos.deleteOrderById(id);
	}

}
