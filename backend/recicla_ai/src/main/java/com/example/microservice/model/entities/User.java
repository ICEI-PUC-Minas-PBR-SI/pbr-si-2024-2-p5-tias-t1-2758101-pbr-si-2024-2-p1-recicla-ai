package com.example.microservice.model.entities;


import com.example.microservice.model.record.UserRecord;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    private String name;
    private String email;
    private String birthdate;
    private String phoneNumber;
    private String recyclePreference;
    private String password;

    public User(){}

    public User(String name, String email, String birthdate, String phoneNumber, String recyclePreference, String password){
        this.name = name;
        this.email = email;
        this.birthdate = birthdate;
        this.phoneNumber = phoneNumber;
        this.recyclePreference = recyclePreference;
        this.password = password;
    }

    public User(UserRecord user) {
        this.name = user.name();
        this.email = user.email();
        this.birthdate = user.birthdate();
        this.phoneNumber = user.phoneNumber();
        this.recyclePreference = user.recyclePreference();
        this.password = user.password();
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

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRecyclePreference() {
        return recyclePreference;
    }

    public void setRecyclePreference(String recyclePreference) {
        this.recyclePreference = recyclePreference;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}