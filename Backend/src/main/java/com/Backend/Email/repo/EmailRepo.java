package com.Backend.Email.repo;

import com.Backend.Email.model.email.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepo extends JpaRepository<Email, Long> {

}
