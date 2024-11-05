package com.example.microservice.repositories;

import com.example.microservice.model.entities.PointTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointTransactionRepository extends JpaRepository<PointTransaction,Long> {
}
