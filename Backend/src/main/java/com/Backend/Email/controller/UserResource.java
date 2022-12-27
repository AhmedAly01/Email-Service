package com.Backend.Email.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.Backend.Email.model.email.Email;
import com.Backend.Email.model.email.EmailBuilder;
import com.Backend.Email.model.user.User;
import com.Backend.Email.repo.EmailRepo;
import com.Backend.Email.services.EmailService;
import com.Backend.Email.services.userService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.*;

@CrossOrigin
@RequestMapping("/")
@RestController
public class UserResource {
    private final userService userService;
    private final EmailService emailService;

    public UserResource(userService userService, EmailService emailService){
        this.userService = userService;
        this.emailService = emailService;
    }

    @GetMapping("/user/findAll")
    public ResponseEntity<String>  getAllUsers(){
        List<User> users =  userService.findAllUsers();
        System.out.println(users.toString());
        return new ResponseEntity<>(users.toString(), HttpStatus.OK);
    }

    @GetMapping("/user/find/{email}")
    public ResponseEntity<User>  getUserById(@PathVariable("email") String email){
        User user =  userService.findUser(email);
        System.out.println(email.toString());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/user/add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/user/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        User updateUser = userService.updateUser(user);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }


    @DeleteMapping("/user/delete/{email}")
    @Transactional
    public ResponseEntity<?> deleteUser(@PathVariable("email") String email){
        userService.deleteUser(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/email/compose")
    public ResponseEntity sendEmail(@RequestBody Object finishedEmail) throws JsonProcessingException {

        Map<String, Object> res = new ObjectMapper().convertValue(finishedEmail, HashMap.class);
        EmailBuilder emailBuilder = new EmailBuilder();
        emailBuilder.setFrom(res.get("from").toString());
        emailBuilder.setTo(new ArrayList<String>((Collection<? extends String>)(res.get("to"))));
        emailBuilder.setSubject(res.get("subject").toString());
        emailBuilder.setBody(res.get("body").toString());
        emailBuilder.setPriority(Integer.valueOf(res.get("priority").toString()));
        emailBuilder.setDate(new Date());
        emailBuilder.setPriority(Integer.valueOf(res.get("priority").toString()));
//        emailBuilder.setAttachments();
        User user = userService.findUser(res.get("from").toString());

        Email email = emailService.addEmail(emailBuilder.getEmail());


        System.out.println(email.toString());

        List<Integer> notExist = null;

        if(user != null) {
            System.out.println(email.toString());
            user.sendEmail(userService, email);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/email/getEmails/{ids}")
    public ResponseEntity<List<Email>>  getEmails(@PathVariable List<Long> ids){
        List<Email> emails = emailService.findEmails(ids);
        System.out.println(emails.toString());
        return new ResponseEntity<>(emails, HttpStatus.OK);
    }

    @DeleteMapping("/email/delete/{email}/{id}/{folderName}")
    @Transactional
    public ResponseEntity<?> deleteEmail(@PathVariable("id") Long id, @PathVariable("from") String email, @PathVariable("folderName") String folderName){
        User user = userService.findUser(email);
        user.deleteEmail(id, folderName);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
