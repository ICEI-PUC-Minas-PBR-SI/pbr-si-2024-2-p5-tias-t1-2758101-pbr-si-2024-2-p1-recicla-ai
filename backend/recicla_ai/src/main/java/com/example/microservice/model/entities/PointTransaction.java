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
    private String cpf;
    private Integer quantity;
    private String transaction_date;
    private String company_id;
    private String recycle_address_id;

    public PointTransaction(){}

    public PointTransaction(Integer quantity, String transaction_date, String company_id, String cpf,String recycle_address_id) {
        this.cpf = cpf;
        this.quantity = quantity;
        this.transaction_date = transaction_date;
        this.company_id = company_id;
        this.recycle_address_id = recycle_address_id;
    }

    public PointTransaction(PointTransactionRecord pointTransaction) {
        this.quantity = pointTransaction.quantity();
        this.cpf = pointTransaction.cpf();
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
        return cpf;
    }

    public void setUser_id(@Nonnull String cpf) {
        this.cpf = cpf;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(String transaction_date) {
        this.transaction_date = transaction_date;
    }

    public String getCpf() {
        return cpf;
    }

    public void getCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCompany_id() {
        return company_id;
    }

    public void setCompany_id(String company_id) {
        this.company_id = company_id;
    }
}