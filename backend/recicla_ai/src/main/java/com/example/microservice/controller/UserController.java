package com.example.microservice.controller;

import com.example.microservice.model.entities.User;
import com.example.microservice.model.record.UserRecord;
import com.example.microservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping
    public @ResponseBody User newUser(@RequestBody UserRecord userRecord){
        User user = new User(userRecord);
        return user;
    }

    @GetMapping
    public Iterable<User> allUsers(){
        return userRepo.findAll();
    }
    @GetMapping(path = "/{id}")
    public Optional<User> getUser(@PathVariable Long id){
        return userRepo.findById(id);
    }
    @DeleteMapping
    public Long deleteUser(@RequestParam Long id){
        userRepo.deleteById(id);
        return id;
    }

    @PutMapping(path = "/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User reqUser){
        Optional<User> optionalUser = userRepo.findById(id);
        User user = optionalUser.get();
//        if (reqUser.getEmail() != null){
//            user.setEmail(reqUser.getEmail());
//        }
//        if (reqUser.getName() != null) {
//            user.setName(reqUser.getName());
//        }
//        if (reqUser.getBirthdate() != null) {
//            user.setBirthdate(reqUser.getBirthdate());
//        }
//        if (reqUser.getPhoneNumber() != null){
//            user.setPhoneNumber(reqUser.getPhoneNumber());
//        }
//        if (reqUser.getRecyclePreference() != null) {
//            user.setRecyclePreference(reqUser.getRecyclePreference());
//        }
        userRepo.save(user);
        return user;
    }

    /*@GetMapping(path="/pagina/{pagina}/{qtdPag}")
    public Iterable<User> paginatedUser(@PathVariable Long pagina,@PathVariable int qtdPag){
        PageRequest page = PageRequest.of(pagina-1,qtdPag);
        return userRepo.findAll(page);
    }*/


}
