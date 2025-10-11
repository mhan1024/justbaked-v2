package com.example.justbaked_v2.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="customer_orders")
public class CustomerOrder {

	@Id
	@GeneratedValue
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="uid")
	private Customer customer;
	
	@Column(precision = 8, scale = 2)
	private java.math.BigDecimal total;
	
	@Column(length = 250)
	private String status;
	
	private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
