package com.example.microservice.model.entities;

import com.example.microservice.model.record.PointTransactionRecord;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Entity
@Table(name = "point_transaction")
public class PointTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    private String document;
    private String quantity;
    private String transaction_date;
    private String company_id;
    private String recycle_address_id;

    public PointTransaction(){}

    public PointTransaction(String document, String quantity, String transaction_date, String company_id, String recycle_address_id) {
        this.document = document;
        this.quantity = quantity;
        this.transaction_date = transaction_date;
        this.company_id = company_id;
        this.recycle_address_id = recycle_address_id;
    }

    public PointTransaction(PointTransactionRecord pointTransaction) {
        this.document = pointTransaction.document();
        this.quantity = pointTransaction.quantity();
        this.transaction_date = pointTransaction.transaction_date();
        this.company_id = pointTransaction.company_id();
        this.recycle_address_id = pointTransaction.recycle_address_id();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Nonnull
    public String getUser_id() {
        return document;
    }

    public void setUser_id(@Nonnull String document) {
        this.document = document;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(String transaction_date) {
        this.transaction_date = transaction_date;
    }

    public String getCompany_id() {
        return company_id;
    }

    public void setCompany_id(String company_id) {
        this.company_id = company_id;
    }
}