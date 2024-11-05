package com.example.microservice.controller;

import com.example.microservice.model.entities.PointTransaction;
import com.example.microservice.model.record.PointTransactionRecord;
import com.example.microservice.model.record.PointTransactionRecord;
import com.example.microservice.repositories.PointTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/points")
public class PointTransactionController {
    @Autowired
    private PointTransactionRepository pointRepo;

    @PostMapping
    public @ResponseBody PointTransaction newPointTransaction(@RequestBody PointTransactionRecord pointTransactionRecord){
        PointTransaction pointTransaction = new PointTransaction(pointTransactionRecord);
        this.pointRepo.save(pointTransaction);
        return pointTransaction;
    }
}
