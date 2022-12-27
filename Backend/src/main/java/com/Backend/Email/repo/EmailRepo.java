package com.Backend.Email.repo;

import com.Backend.Email.model.email.Email;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailRepo extends JpaRepository<Email, Long> {
    Optional<Email> findEmailById(Long id);
}