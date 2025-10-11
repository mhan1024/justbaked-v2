package com.example.justbaked_v2.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "imageData")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageData {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String type;
	
	@Lob
	@Column(name = "imagedata", columnDefinition = "LONGBLOB")
	private byte[] imageData;
	

}