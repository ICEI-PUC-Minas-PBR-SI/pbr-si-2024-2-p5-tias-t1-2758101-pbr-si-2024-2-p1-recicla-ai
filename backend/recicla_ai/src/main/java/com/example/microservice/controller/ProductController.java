package com.example.microservice.controller;

import com.example.microservice.model.entities.Product;
import com.example.microservice.model.record.ProductRecord;
import com.example.microservice.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepo;

    @PostMapping
    public @ResponseBody Product newProduct(@RequestBody ProductRecord productRecord){
        Product product = new Product(productRecord);
        this.productRepo.save(product);
        return product;
    }

    @GetMapping
    public Iterable<Product> allProducts(){
        return productRepo.findAll();
    }
    @GetMapping(path = "/{id}")
    public Optional<Product> getProduct(@PathVariable Long id){
        return productRepo.findById(id);
    }

    @DeleteMapping
    public Long deleteProduct(@RequestParam Long id){
        productRepo.deleteById(id);
        return id;
    }


}
