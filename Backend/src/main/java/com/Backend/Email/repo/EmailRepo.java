package com.Backend.Email.repo;

import com.Backend.Email.model.email.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface EmailRepo extends JpaRepository<Email, Long> {
    Optional<Email> findEmailById(Long id);
}
