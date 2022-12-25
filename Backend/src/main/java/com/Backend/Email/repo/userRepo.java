package com.Backend.Email.repo;

import com.Backend.Email.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface userRepo extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);

    void deleteUserByEmail(String email);
}
