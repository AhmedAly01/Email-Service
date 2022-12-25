package com.Backend.Email.services;

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

    public User findUser(String email) {
        return userRepo.findUserByEmail(email)
                .orElse(null);
    }

    public void deleteUser(String email) {
        userRepo.deleteUserByEmail(email);
    }
}
