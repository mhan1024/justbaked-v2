package com.example.justbaked_v2.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="customers")
public class Customer {
	
	@Id
	private String uid;
	
	@Column(length = 500)
	private String email;
	
	@Column(length = 500)
	private String displayName;
	
}
