package com.Backend.Email.repo;

import com.Backend.Email.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);


    void deleteUserByEmail(String email);
}
