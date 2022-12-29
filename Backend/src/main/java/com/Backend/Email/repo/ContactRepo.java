package com.Backend.Email.repo;

import com.Backend.Email.model.contact.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContactRepo extends JpaRepository<Contact, Long> {
    Optional<Contact> findContactById(Long Id);
}
