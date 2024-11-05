package com.example.microservice.repositories;

import com.example.microservice.model.entities.Company;
import com.example.microservice.model.entities.RecycleAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecycleAddressRepository extends JpaRepository<RecycleAddress,Long> {
}
