package com.example.microservice.repositories;

import com.example.microservice.model.entities.Company;
import com.example.microservice.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company,Long> {
    Optional<Company> findByEmail(String email);
}
