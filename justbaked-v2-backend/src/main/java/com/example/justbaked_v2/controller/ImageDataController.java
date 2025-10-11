package com.example.justbaked_v2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.justbaked_v2.model.*;
import com.example.justbaked_v2.service.*;
import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/images")
public class ImageDataController {

	@Autowired
	private ImageDataService ids;
	
	@PostMapping
	public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
		ImageData response = ids.uploadImage(file);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
	}
	
	@GetMapping("/info/{name}")
    public ResponseEntity<?>  getImageInfoByName(@PathVariable("name") String name){
        ImageData image = ids.getInfoByImageByName(name);

        return ResponseEntity.status(HttpStatus.OK)
                .body(image);
    }
	
	@GetMapping("/{name}")
    public ResponseEntity<?>  getImageByName(@PathVariable("name") String name){
        byte[] image = ids.getImage(name);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }
	
	@DeleteMapping("/{name}")
	public void deleteImageByName(@PathVariable String name) {
		ids.deleteImageByName(name);
	}
	
}
