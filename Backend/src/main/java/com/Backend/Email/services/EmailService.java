package com.Backend.Email.services;


import com.Backend.Email.model.email.Email;
import com.Backend.Email.repo.EmailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final EmailRepo emailRepo;


    @Autowired
    public EmailService(EmailRepo emailRepo, EmailRepo emailRepo1){
        this.emailRepo = emailRepo1;
    }

    public void addEmail(Email email){
        emailRepo.save(email);
    }

    public Email findEmail(Long id){
        return emailRepo.findEmailById(id).orElse(null);
    }
}
