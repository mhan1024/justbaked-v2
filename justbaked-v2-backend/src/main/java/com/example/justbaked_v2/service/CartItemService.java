package com.example.justbaked_v2.service;

import org.springframework.stereotype.Service;
import com.example.justbaked_v2.model.*;
import com.example.justbaked_v2.repository.*;
import java.util.*;

@Service
public class CartItemService {
	
	private CartItemRepository cir;
	private CustomerOrderRepository cor;
	private ItemRepository ir;
	
	public CartItemService(CartItemRepository cir, CustomerOrderRepository cor, ItemRepository ir) {
		this.cir = cir;
		this.cor = cor;
		this.ir = ir;
	}
	
	public CartItem createItemOrder(Integer orderId, CartItem cartItem) {
		CustomerOrder order = cor.findById(orderId)
				.orElseThrow(() -> new RuntimeException("Order not found"));
		
		Item item= ir.findById(cartItem.getItem().getId())
				.orElseThrow(() -> new RuntimeException("Item not found"));
		
		cartItem.setOrder(order);
		cartItem.setItem(item);
		
		return cir.save(cartItem);
		
	}
	
	public Optional<CartItem> findOrderItemById(Integer id){
		return cir.findById(id);
	}
	
	public List<CartItem> getAllCartItems(){
		return cir.findAll();
	}
	
	public List<CartItem> getItemsByOrderId(Integer orderId){
		return cir.findByOrderId(orderId);
	}
	
	public CartItem updateItem(CartItem item) {
		return cir.save(item);
	}
	
	public void deleteCartItemById(Integer id) {
		cir.deleteById(id);
	}

}
