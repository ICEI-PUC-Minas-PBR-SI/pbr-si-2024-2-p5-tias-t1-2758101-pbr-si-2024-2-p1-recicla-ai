package com.example.microservice.model.entities;


import com.example.microservice.model.record.CompanyRecord;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    private String name;
    private String email;
    private String cnpj;
    private String phoneNumber;
    private String postal_code;
    private String password;
    private String addressNumber;

    public Company(){}

    public Company(String name, String email, String cnpj, String phoneNumber, String postal_code,String addressNumber, String password){
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.cnpj = cnpj;
        this.postal_code = postal_code;
        this.password = password;
        this.addressNumber = addressNumber;
    }

    public Company(CompanyRecord company) {
        this.name = company.name();
        this.email = company.email();
        this.cnpj = company.cnpj();
        this.phoneNumber = company.phoneNumber();
        this.postal_code = company.postal_code();
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

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPostalCode() {
        return postal_code;
    }

    public void setPostalCode(String postal_code) {
        this.postal_code = postal_code;
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