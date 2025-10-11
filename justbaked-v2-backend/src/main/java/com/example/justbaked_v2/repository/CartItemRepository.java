package com.example.justbaked_v2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.example.justbaked_v2.model.*;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

	List<CartItem> findByOrderId(Integer orderId);

}