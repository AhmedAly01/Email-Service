package com.Backend.Email.controller;

import com.Backend.Email.model.email.Email;
import com.Backend.Email.model.email.EmailBuilder;
import com.Backend.Email.model.user.User;
import com.Backend.Email.services.EmailService;
import com.Backend.Email.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin
@RequestMapping("/")
@RestController
public class UserResource {
    private final UserService userService;
    private final EmailService emailService;

    public UserResource(UserService userService, EmailService emailService){
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
        User newUser = userService.saveUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/user/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        User updateUser = userService.saveUser(user);
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
        emailBuilder.setDate(LocalDateTime.now());
        emailBuilder.setPriority(Integer.valueOf(res.get("priority").toString()));
//        emailBuilder.setAttachments();
        User user = userService.findUser(res.get("from").toString());

        Email email = emailService.addEmail(emailBuilder.getEmail());

        System.out.println(email.toString());

        List<Integer> notExist = null;

        if(user != null) {
            System.out.println(email.toString());
            user.sendEmail(userService, email);
            emailService.addEmail(email);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/email/getEmails/{email}/{folderName}/{ids}")
    public ResponseEntity<List<Email>>  getEmails(@PathVariable List<Long> ids, @PathVariable String folderName, @PathVariable String email){
        List<Email> emails = emailService.findEmails(ids);
        if(folderName.equals("trash")){
            LocalDateTime currDateTime = LocalDateTime.now().minusDays(30);
            User user = null;
            for(int i=0;i<emails.size();i++){
                Email currEmail = emails.get(i);
                if(currEmail.getDate().isBefore(currDateTime)){
                    if(user == null){
                        user = userService.findUser(email);
                    }
                    user.removeFromDeleted(currEmail.getId());

                    emails.remove(currEmail);
                    if(currEmail.removeAlink() <= 0){
                        emailService.deleteEmail(currEmail.getId());
                    }
                }
            }
            if(user != null)
                userService.saveUser(user);
        }
        System.out.println(emails.toString());
        return new ResponseEntity<>(emails, HttpStatus.OK);
    }

    @DeleteMapping("/email/delete/{email}/{id}/{folderName}")
    @Transactional
    public ResponseEntity<?> deleteEmail(@PathVariable("id") Long id, @PathVariable("email") String email, @PathVariable("folderName") String folderName) {
        User user = userService.findUser(email);
        if (folderName.equals("trash")){
            user.removeFromDeleted(id);
            Email currEmail = emailService.findEmail(id);
            if(currEmail.removeAlink() <= 0){
                emailService.deleteEmail(currEmail.getId());
            }
            userService.saveUser(user);
        }else
            user.deleteEmail(id, folderName, userService);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/email/getAll")
    public ResponseEntity<List<Email>> getAllEmails(){
        return new ResponseEntity<>(emailService.getAll(), HttpStatus.OK);
    }


}
