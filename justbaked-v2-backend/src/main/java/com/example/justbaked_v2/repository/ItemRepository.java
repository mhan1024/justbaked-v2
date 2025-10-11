package com.example.justbaked_v2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.example.justbaked_v2.model.*;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

	Optional<Item> findItemByDessertName(String dessertName);

}