package com.Backend.Email.services;


import com.Backend.Email.model.email.Email;
import com.Backend.Email.repo.EmailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmailService {
    private final EmailRepo emailRepo;


    @Autowired
    public EmailService(EmailRepo emailRepo, EmailRepo emailRepo1){
        this.emailRepo = emailRepo1;
    }

    public Email addEmail(Email email){
        return emailRepo.save(email);
    }

    public Email findEmail(Long id){
        return emailRepo.findEmailById(id).orElse(null);
    }

    public List<Email> findEmails(List<Long> ids){
        List<Email> emails = new ArrayList<Email>();
        for(int i=0;i<ids.size();i++){
            emails.add(emailRepo.findEmailById(ids.get(i)).orElse(null));
        }
        return emails;
    }

    public void deleteEmail(Long id){
        emailRepo.deleteById(id);
    }

}
