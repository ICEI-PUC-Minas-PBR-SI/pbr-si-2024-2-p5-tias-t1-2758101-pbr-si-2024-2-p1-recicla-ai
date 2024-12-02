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

    public String getProductId() {
        return product_id;
    }

    public void setProductId(String product_id) {
        this.product_id = product_id;
    }

    public String getCpf() {
        return cpf;
    }

    public void SetCpf(String cpf) {
        this.cpf = cpf;
    }

    public void SetTransactionDate(String transaction_date) {
        this.transaction_date = transaction_date;
    }

    public String getTransactionDate() {
        return transaction_date;
    }


}