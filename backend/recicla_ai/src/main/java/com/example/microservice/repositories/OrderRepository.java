package com.example.microservice.repositories;

import com.example.microservice.model.entities.Order;
import com.example.microservice.model.entities.User;
import com.example.microservice.model.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Iterable<Order> findByCpf(String cpf);
}
