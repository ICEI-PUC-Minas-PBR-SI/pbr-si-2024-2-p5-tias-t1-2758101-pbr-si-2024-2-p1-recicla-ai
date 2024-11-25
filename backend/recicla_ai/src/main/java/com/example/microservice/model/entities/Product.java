package com.example.microservice.model.entities;


import com.example.microservice.model.record.ProductRecord;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    private String name;
    private String value;
    private String description;
    private String category;
    private String quantity;

    public Product(){}
    public Product(String name, String value, String description, String category, String quantity){
        this.name = name;
        this.value = value;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
    }
    public Product(ProductRecord user) {
        this.name = user.name();
        this.value = user.value();
        this.description = user.description();
        this.category = user.category();
        this.quantity = user.quantity();
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
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