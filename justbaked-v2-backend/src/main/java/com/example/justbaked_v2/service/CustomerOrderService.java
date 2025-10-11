package com.example.justbaked_v2.service;

import org.springframework.stereotype.Service;
import com.example.justbaked_v2.model.*;
import com.example.justbaked_v2.repository.*;
import java.util.*;

@Service
public class CustomerOrderService {
	
	private final CustomerOrderRepository cosr;
	
	public CustomerOrderService(CustomerOrderRepository cosr) {
		this.cosr = cosr;
	}
	
	public CustomerOrder createOrder(CustomerOrder order) {
		return cosr.save(order);
	}
	
	public Optional<CustomerOrder> findById(Integer id) {
        return cosr.findById(id);
    }

    public List<CustomerOrder> getAllOrders() {
        return cosr.findAll();
    }

    public List<CustomerOrder> getOrdersByCustomer(Customer customer) {
        return cosr.findOrderByCustomer(customer);
    }
    
    public void deleteOrderById(Integer id) {
    	cosr.deleteById(id);
    }
}
