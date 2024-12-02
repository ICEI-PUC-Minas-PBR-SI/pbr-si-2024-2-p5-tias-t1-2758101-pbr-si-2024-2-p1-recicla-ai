package com.example.microservice.controller;

import com.example.microservice.model.entities.Order;
import com.example.microservice.model.entities.User;
import com.example.microservice.model.entities.Product;
import com.example.microservice.model.record.OrderRecord;
import com.example.microservice.repositories.OrderRepository;
import com.example.microservice.repositories.UserRepository;
import com.example.microservice.repositories.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@RestController
@RequestMapping(path = "/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    @PostMapping
    public @ResponseBody Order newOrder(@RequestBody OrderRecord orderRecord) throws Exception {
       
        Optional<User> userFound = userRepo.findByCpf(orderRecord.cpf());
        Order newOrder = new Order(orderRecord);
        Long productId = Long.parseLong(newOrder.getProductId()); 
        Optional<Product> productFound = productRepo.findById(productId);


        if (userFound.isPresent() && productFound.isPresent()) {
            User user = userFound.get();
            Product product = productFound.get();
            if(user.getPoints() < product.getValue())
                throw new Exception("Erro: Saldo não é suficiente");

            user.subtractPoints(product.getValue());

            this.orderRepo.save(newOrder); 
            this.userRepo.save(user);

            return newOrder;
        }

        throw new Exception("Erro: Usuário não encontrado");
    }
    @GetMapping
    public Iterable<Order> allorders(){
        return orderRepo.findAll();
    }
    @GetMapping(path = "/{cpf}")
    public ResponseEntity<Iterable<Order>> getOrders(@PathVariable String cpf){
    Iterable<Order> orders = orderRepo.findByCpf(cpf); 
    
    return ResponseEntity.ok(orders); 
    
    }

}
