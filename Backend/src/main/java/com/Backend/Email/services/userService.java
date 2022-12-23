package com.Backend.Email.services;

import com.Backend.Email.exeption.userNotFoundException;
import com.Backend.Email.model.User;
import com.Backend.Email.repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class userService {
    private final userRepo userRepo;

    @Autowired
    public userService(userRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser(User user){
        return userRepo.save(user);
    }

    public List<User> findAllUsers(){
        return userRepo.findAll();
    }

    public User updateUser(User user){
        return userRepo.save(user);
    }

    public User findUser(Long id) {
        return userRepo.findUserById(id)
                .orElseThrow(() -> new userNotFoundException("User by id " + id + " was not found!"));
    }

    public void deleteUser(Long id) {
        userRepo.deleteUserById(id);
    }
}
