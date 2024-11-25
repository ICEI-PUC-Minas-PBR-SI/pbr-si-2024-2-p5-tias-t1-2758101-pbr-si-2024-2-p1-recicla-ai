package com.example.microservice.repositories;

import com.example.microservice.model.entities.Product;
import com.example.microservice.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
