package com.example.justbaked_v2.controller;

import org.springframework.web.bind.annotation.*;
import com.example.justbaked_v2.model.*;
import com.example.justbaked_v2.service.CartItemService;
import com.example.justbaked_v2.service.CustomerOrderService;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/order-items")
public class CartItemController {
	
	private final CartItemService cis;
	private final CustomerOrderService cos;
	
	public CartItemController(CartItemService cis, CustomerOrderService cos) {
		this.cis = cis;
		this.cos = cos;
	}
	
	@PostMapping
	public CartItem createItemOrder(@RequestBody CartItem o) {
		return cis.createItemOrder(o.getOrder().getId(),o);
	}
	
	@GetMapping
	public List<CartItem> getAllCartItems(){
		return cis.getAllCartItems();
	}
	
	@GetMapping("/{id}")
	public CartItem getCartItemById(@PathVariable Integer id) {
		return cis.findOrderItemById(id)
				.orElseThrow(() -> new RuntimeException("Cart item not found"));
	}
	
	@GetMapping("/order-id/{orderId}")
	public List<CartItem> getItemsByOrderId(@PathVariable Integer orderId) {
		CustomerOrder order = cos.findById(orderId)
				.orElseThrow(() -> new RuntimeException("Order not found"));
		
		return cis.getItemsByOrderId(order.getId());
	}
	
	@PutMapping("/cart-item-id/{cartItemId}")
	public CartItem updateItemStatus(@PathVariable Integer cartItemId, @RequestBody Map<String, String> updates) {
		CartItem item = getCartItemById(cartItemId);
		
		if (updates.containsKey("status")) {
			item.setStatus(updates.get("status"));
		}
		
		return cis.updateItem(item);
	}
	
	@DeleteMapping("/{id}")
	public void deleteCartItemById(@PathVariable Integer id) {
		cis.deleteCartItemById(id);
	}

}
