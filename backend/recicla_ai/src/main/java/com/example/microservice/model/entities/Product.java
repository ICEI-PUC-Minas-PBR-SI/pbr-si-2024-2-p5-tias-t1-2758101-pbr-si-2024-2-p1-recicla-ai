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
    private Integer value;
    private String description;
    private String category;
    private Integer quantity;

    public Product(){}
    public Product(String name, Integer value, String description, String category, Integer quantity){
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

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
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