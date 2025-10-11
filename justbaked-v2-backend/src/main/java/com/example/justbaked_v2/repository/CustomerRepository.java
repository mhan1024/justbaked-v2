package com.example.justbaked_v2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.example.justbaked_v2.model.*;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String>{
	Optional<Customer> findCustomerByUid(String uid);
	Optional<Customer> findByEmail(String email);
	Optional<Customer> findByDisplayName(String displayName);

}
