package com.example.microservice.model.entities;


import com.example.microservice.model.record.CompanyRecord;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Entity
@Table(name = "companys")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    private String name;
    private String email;
    private String document;
    private String phoneNumber;
    private String postalCode;
    private String password;
    private String addressNumber;

    public Company(){}

    public Company(String name, String email, String document, String phoneNumber, String postalCode,String addressNumber, String password){
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.document = document;
        this.postalCode = postalCode;
        this.password = password;
        this.addressNumber = addressNumber;
    }

    public Company(CompanyRecord company) {
        this.name = company.name();
        this.email = company.email();
        this.document = company.document();
        this.phoneNumber = company.phoneNumber();
        this.postalCode = company.postalCode();
        this.password = company.password();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(@Nonnull String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddressNumber() {
        return addressNumber;
    }

    public void setAddressNumber(String addressNumber) {
        this.addressNumber = addressNumber;
    }
}