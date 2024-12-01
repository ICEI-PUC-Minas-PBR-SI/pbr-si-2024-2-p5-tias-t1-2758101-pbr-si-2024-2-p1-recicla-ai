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
    private String street;
    private String district;
    private String city;
    private String state;


    public RecycleAddress(){}

    public RecycleAddress(String name, String phoneNumber, String postalCode, String addressNumber, String recyclePreference, String company_id, String street, String district, String city, String state) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.postalCode = postalCode;
        this.addressNumber = addressNumber;
        this.recyclePreference = recyclePreference;
        this.company_id = company_id;
        this.state = state;
        this.district = district;
        this.city = city;
        this.street = street;
    }

    public RecycleAddress(RecycleAddressRecord recycleAddress) {
        this.name = recycleAddress.name();
        this.phoneNumber = recycleAddress.phoneNumber();
        this.postalCode = recycleAddress.postalCode();
        this.addressNumber = recycleAddress.addressNumber();
        this.recyclePreference = recycleAddress.recyclePreference();
        this.company_id = recycleAddress.company_id();
        this.state = recycleAddress.state();
        this.district = recycleAddress.district();
        this.city = recycleAddress.city();
        this.street = recycleAddress.street();
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

    public String getCompanyId() {
        return company_id;
    }

    public String getName() {
        return name;
    }

    public void setName(@Nonnull String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }
}