package com.example.microservice.controller;

import com.example.microservice.model.entities.PointTransaction;
import com.example.microservice.model.entities.User;
import com.example.microservice.model.record.PointTransactionRecord;
import com.example.microservice.model.record.PointTransactionRecord;
import com.example.microservice.repositories.PointTransactionRepository;
import com.example.microservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/points")
public class PointTransactionController {
    @Autowired
    private PointTransactionRepository pointRepo;
    @Autowired
    private UserRepository userRepo;

    @PostMapping
    public @ResponseBody PointTransaction newPointTransaction(@RequestBody PointTransactionRecord pointTransactionRecord) throws Exception {

        Optional<User> userFound = userRepo.findByCpf(pointTransactionRecord.cpf());
        if(userFound.isPresent()){
            PointTransaction pointTransaction = new PointTransaction(pointTransactionRecord);
            this.pointRepo.save(pointTransaction);
        
            User user = userFound.get();
            user.setPoints(pointTransactionRecord.quantity());
            this.userRepo.save(user);
            return pointTransaction;
        }
        

        throw new Exception( "Erro: Usuário não encontrado");

    }

    @GetMapping
    public Iterable<PointTransaction> allPointTransaction(){
        return pointRepo.findAll();
    }
}
