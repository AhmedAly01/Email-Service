package com.Backend.Email.services;

import com.Backend.Email.model.contact.Contact;
import com.Backend.Email.model.email.Email;
import com.Backend.Email.repo.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {

    private final ContactRepo contactRepo;

    @Autowired
    public ContactService(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    }

    public Contact saveContact(Contact contact){
        return contactRepo.save(contact);
    }

    public Contact findContact(Long id){
        return contactRepo.findContactById(id).orElse(null);
    }

    public List<Contact> findContacts(List<Long> ids){
        List<Contact> contacts = new ArrayList<Contact>();
        for(int i=0;i<ids.size();i++){
            contacts.add(contactRepo.findContactById(ids.get(i)).orElse(null));
        }
        return contacts;
    }

    public void deleteContact(Long id){
        contactRepo.deleteById(id);
    }

    public List<Contact> getAll(){
        return contactRepo.findAll();
    }

}
