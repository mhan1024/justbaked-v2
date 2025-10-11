package com.example.justbaked_v2.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="order_items")
public class CartItem {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="customer_order_id")
	private CustomerOrder order;
	
	@ManyToOne
	@JoinColumn(name="item_id")
	private Item item;
	
	private Integer quantity;
	
	@Column(precision = 6, scale = 2)
	private java.math.BigDecimal price;
	
	// BAKING or READY
	private String status; 

}