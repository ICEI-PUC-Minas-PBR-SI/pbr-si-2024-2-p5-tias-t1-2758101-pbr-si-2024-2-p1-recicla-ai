package com.example.microservice.model.entities;


import com.example.microservice.model.record.CompanyRecord;
import com.example.microservice.model.record.RecycleAddressRecord;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Entity
@Table(name = "recycle_address")
public class RecycleAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    private String name;
    private String phoneNumber;
    private String postalCode;
    private String addressNumber;
    private String recyclePreference;
    private String company_id;


    public RecycleAddress(){}

    public RecycleAddress(String name, String phoneNumber, String postalCode, String addressNumber, String recyclePreference, String company_id) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.postalCode = postalCode;
        this.addressNumber = addressNumber;
        this.recyclePreference = recyclePreference;
        this.company_id = company_id;
    }

    public RecycleAddress(RecycleAddressRecord recycleAddress) {
        this.name = recycleAddress.name();
        this.phoneNumber = recycleAddress.phoneNumber();
        this.postalCode = recycleAddress.postalCode();
        this.addressNumber = recycleAddress.addressNumber();
        this.recyclePreference = recycleAddress.recyclePreference();
        this.company_id = recycleAddress.company_id();
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

    public String getAddressNumber() {
        return addressNumber;
    }

    public void setAddressNumber(String addressNumber) {
        this.addressNumber = addressNumber;
    }

    public String getRecyclePreference() {
        return recyclePreference;
    }

    public void setRecyclePreference(String recyclePreference) {
        this.recyclePreference = recyclePreference;
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
}