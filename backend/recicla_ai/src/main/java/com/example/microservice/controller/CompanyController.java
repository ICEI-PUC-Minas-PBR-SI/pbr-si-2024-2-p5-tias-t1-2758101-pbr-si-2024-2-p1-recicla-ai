package com.example.microservice.controller;

import com.example.microservice.model.entities.Company;
import com.example.microservice.model.entities.RecycleAddress;
import com.example.microservice.model.record.CompanyRecord;
import com.example.microservice.model.record.RecycleAddressRecord;
import com.example.microservice.repositories.CompanyRepository;
import com.example.microservice.repositories.RecycleAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepo;

    @Autowired
    private RecycleAddressRepository recycleAddressRepo;

    @PostMapping
    public @ResponseBody Company newCompany(@RequestBody CompanyRecord companyRecord){
        Company company = new Company(companyRecord);
        this.companyRepo.save(company);
        return company;
    }

    @GetMapping
    public Iterable<Company> allCompanys(){
        return companyRepo.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Company> getCompany(@PathVariable Long id){
        return companyRepo.findById(id);
    }

    @DeleteMapping
    public Long deleteCompany(@RequestParam Long id){
        companyRepo.deleteById(id);
        return id;
    }

    @PutMapping(path = "/{id}")
    public Company updateCompany(@PathVariable Long id, @RequestBody Company reqCompany){
        Optional<Company> optionalCompany = companyRepo.findById(id);
        Company company = optionalCompany.get();
        companyRepo.save(company);
        return company;
    }


}
