package com.example.microservice.controller;

import com.example.microservice.model.entities.RecycleAddress;
import com.example.microservice.model.record.RecycleAddressRecord;
import com.example.microservice.repositories.RecycleAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recycle")
public class RecycleAddressController {

    @Autowired
    private RecycleAddressRepository recycleAddressRepo;

    @PostMapping
    public @ResponseBody RecycleAddress newRecycleAddress(@RequestBody RecycleAddressRecord recycleAddressRecord){
        RecycleAddress recycleAddress = new RecycleAddress(recycleAddressRecord);
        this.recycleAddressRepo.save(recycleAddress);
        return recycleAddress;
    }

    @GetMapping
    public Iterable<RecycleAddress> allRecycleAddress(){
        return recycleAddressRepo.findAll();
    }
}
