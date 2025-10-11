package com.example.justbaked_v2.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.justbaked_v2.model.*;
import com.example.justbaked_v2.service.*;
import java.util.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/items")
public class ItemController {
	
	private final ItemService iser;
	
	public ItemController(ItemService iser) {
		this.iser = iser;
	}
	
	@PostMapping
	public Item createItem(@RequestBody Item i) {
		return iser.saveItem(i);
	}
	
	/*
	 *  Handles GET requests to /{id} and it looks for an Item by its id
	 *  and returns the item if found or a 404 error
	 *  
	 *  ResponseEntity: Spring's way of returning HTTP responses with status and data
	 *  
	 *  @PathVariable: extracts id from the URL
	 */

	@GetMapping("/item-id/{id}")
	public ResponseEntity<Item> getItemById(@PathVariable Integer id) {
		return iser.findItemById(id)
				.map(ResponseEntity::ok) // Wraps the item, so it returns the item with a status 200 ok
				.orElse(ResponseEntity.notFound().build()); // returns a response with status 404 if item is not found
	}
	
	@GetMapping("/item-name/{dessertName}")
	public ResponseEntity<Item> getItemByDessertName(@PathVariable String dessertName){
		return iser.findItemByName(dessertName)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping
	public List<Item> getAllItems() {
		return iser.getAllItems();
	}
	
	
	/* 
	 *  @RequestBody: Spring takes the JSON body from the HTTP request and 
	 *  turns it into an Item object
	 */
	@PutMapping("/{id}")
	public Item updateItem(@RequestBody Item i, @PathVariable Integer id) {
		return iser.updateItem(id, i);
	}
	
	@DeleteMapping("/{id}")
	public void deleteItemById(@PathVariable Integer id) {
		iser.deleteItemById(id);
	}

}
