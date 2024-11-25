package com.example.microservice.model.entities;

import com.example.microservice.model.record.OrderRecord;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    private String cpf;
    private String product_id;
    private String transaction_date;

    public Order(){}

    public Order(String product_id, String transaction_date, String cpf) {
        this.cpf = cpf;
        this.product_id = product_id;
        this.transaction_date = transaction_date;
    }

    public Order(OrderRecord order) {
        this.product_id = order.product_id();
        this.cpf = order.cpf();
        this.transaction_date = order.transaction_date();
    }
}