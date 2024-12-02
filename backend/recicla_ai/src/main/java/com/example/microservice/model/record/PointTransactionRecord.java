package com.example.microservice.model.record;

public record PointTransactionRecord(String document, Integer quantity, String transaction_date, String company_id, String cpf, String recycle_address_id) {
}
