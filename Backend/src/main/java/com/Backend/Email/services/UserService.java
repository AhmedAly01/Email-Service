package com.Backend.Email.services;

import com.Backend.Email.model.user.User;
import com.Backend.Email.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User saveUser(User user){
        return userRepo.save(user);
    }

    public List<User> findAllUsers(){
        return userRepo.findAll();
    }


    public User findUser(String email) {
        return userRepo.findUserByEmail(email)
                .orElse(null);
    }

    public void deleteUser(String email) {
        userRepo.deleteUserByEmail(email);
    }
}
