package com.example.microservice.controller;

import com.example.microservice.model.entities.Company;
import com.example.microservice.model.record.CompanyRecord;
import com.example.microservice.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepo;

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
//        if (reqCompany.getEmail() != null){
//            company.setEmail(reqCompany.getEmail());
//        }
//        if (reqCompany.getName() != null) {
//            company.setName(reqCompany.getName());
//        }
//        if (reqCompany.getBirthdate() != null) {
//            company.setBirthdate(reqCompany.getBirthdate());
//        }
//        if (reqCompany.getPhoneNumber() != null){
//            company.setPhoneNumber(reqCompany.getPhoneNumber());
//        }
//        if (reqCompany.getRecyclePreference() != null) {
//            company.setRecyclePreference(reqCompany.getRecyclePreference());
//        }
        companyRepo.save(company);
        return company;
    }

    /*@GetMapping(path="/pagina/{pagina}/{qtdPag}")
    public Iterable<Company> paginatedCompany(@PathVariable Long pagina,@PathVariable int qtdPag){
        PageRequest page = PageRequest.of(pagina-1,qtdPag);
        return companyRepo.findAll(page);
    }*/


}
