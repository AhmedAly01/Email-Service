package com.Backend.Email.controller;

import com.Backend.Email.model.attachment.Attachment;
import com.Backend.Email.model.attachment.ResponseAttachment;
import com.Backend.Email.model.contact.Contact;
import com.Backend.Email.model.email.Email;
import com.Backend.Email.model.email.EmailBuilder;
import com.Backend.Email.model.user.User;
import com.Backend.Email.services.AttachmentsService;
import com.Backend.Email.services.ContactService;
import com.Backend.Email.services.EmailService;
import com.Backend.Email.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin
@RequestMapping("/")
@RestController
public class UserResource {
    private final UserService userService;
    private final EmailService emailService;
    private final ContactService contactService;
    private final AttachmentsService attachmentsService;

    public UserResource(UserService userService, EmailService emailService, ContactService contactService, AttachmentsService attachmentsService){
        this.userService = userService;
        this.emailService = emailService;
        this.contactService = contactService;
        this.attachmentsService = attachmentsService;
    }

    @GetMapping("/user/getAll")
    public ResponseEntity<List<User>>  getAllUsers(){
        List<User> users =  userService.findAllUsers();
        System.out.println(users.toString());
        return new ResponseEntity<>(users, HttpStatus.OK);
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
    public ResponseEntity test(@RequestParam(value = "from", required = false) String from,
                               @RequestParam(value = "to", required = false) List<String> to,
                               @RequestParam(value = "subject", required = false) String subject,
                               @RequestParam(value = "body", required = false) String body,
                               @RequestParam(value = "priority", required = false) Integer priority,
                               @RequestParam(value = "attachments", required = false) List<MultipartFile> attachments,
                               @RequestParam(value = "id", required = false) Long id,
                               @RequestParam(value = "draft", required = true) boolean draft) throws IOException {

        boolean finished = true;
        EmailBuilder emailBuilder = new EmailBuilder();

        finished = emailBuilder.setFrom(from) && finished;
        finished = emailBuilder.setTo(to) && finished;
        finished = emailBuilder.setSubject(subject) && finished;
        finished = emailBuilder.setBody(body) && finished;

        emailBuilder.setPriority(priority);
        emailBuilder.setAttachments(attachments, attachmentsService);
        emailBuilder.setDate(LocalDateTime.now());
        emailBuilder.setId(id);

        User user = userService.findUser(from);
        Email email = emailService.addEmail(emailBuilder.getEmail());

        System.out.println(finished);
        System.out.println(draft);
        if(finished && !draft) {
            List<Integer> notExist = null;

            if (user != null) {
                user.sendEmail(userService, email);
            }
        }else{
            user.addToDraft(email.getId(), userService);
            email.setLinks(1);
        }

        emailService.addEmail(email);
        System.out.println(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/email/get/attachments/{id}")
    public ResponseEntity<List<ResponseAttachment>> getAttachment(@PathVariable("id") List<Long> ids){
        List<ResponseAttachment> files = attachmentsService.getAttachments(ids).map(attachment -> {
            String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/attachments/").path(attachment.getId().toString()).toUriString();

            return new ResponseAttachment(attachment.getName(), fileUri, attachment.getType(), attachment.getData().length);
        }).collect(Collectors.toList());


        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @PostMapping("/upload")
    public ResponseEntity<Long> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        Attachment attachment = attachmentsService.store(file);

        return ResponseEntity.status(HttpStatus.OK).body(attachment.getId());
    }

    @GetMapping("/attachments/{id}")
    public ResponseEntity<byte[]> downloadAttachment(@PathVariable("id") Long id) throws SQLException {
        List<byte[]> files = attachmentsService.getAttachment(id).map(attachment -> {
            byte[] data = attachment.getData();

            return data;
        }).toList();
        System.out.println("-------------------------------------------------------");
        System.out.println(files.get(0).length);
        return new ResponseEntity<>(files.get(0), HttpStatus.OK);
    }



    @GetMapping("/email/getEmails/{email}/{folderName}/{ids}")
    public ResponseEntity<List<Email>>  getEmails(@PathVariable List<Long> ids, @PathVariable String folderName, @PathVariable String email){
        List<Email> emails = emailService.findEmails(ids);
        if(folderName.equals("trash")){
            LocalDateTime currDateTime = LocalDateTime.now().minusDays(30);
            User user = userService.findUser(email);
            List<LocalDateTime> deletionTimes = user.getDeletionTime();
            for(int i=0;i<emails.size();i++){
                Email currEmail = emails.get(i);
                if(deletionTimes.get(i).isBefore(currDateTime)){
                    user.removeFromDeleted(currEmail.getId());
                    emails.remove(currEmail);
                    if(currEmail.removeAlink() <= 0){
                        emailService.deleteEmail(currEmail.getId());
                    }else{
                        emailService.addEmail(currEmail);
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
    public ResponseEntity<?> deleteEmail(@PathVariable("id") List<Long> id, @PathVariable("email") String email, @PathVariable("folderName") String folderName) {
        User user = userService.findUser(email);
        List<Email> emails = emailService.findEmails(id);
        for(int i=0;i<emails.size();i++) {
            Email currEmail = emails.get(i);
            if (folderName.equals("trash")) {
                user.removeFromDeleted(currEmail.getId());
                if (currEmail.removeAlink() <= 0) {
                    emailService.deleteEmail(currEmail.getId());
                }
                userService.saveUser(user);
            } else {
                user.deleteEmail(currEmail.getId(), folderName);
                emailService.addEmail(currEmail);
            }
            userService.saveUser(user);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/email/getAll")
    public ResponseEntity<List<Email>> getAllEmails(){
        return new ResponseEntity<>(emailService.getAll(), HttpStatus.OK);
    }


    @GetMapping("/contact/getAll")
    public ResponseEntity<List<Contact>> getAllContacts(){
        return new ResponseEntity<>(contactService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/contact/add/{email}")
    public ResponseEntity addContact(@RequestBody Contact contact, @PathVariable String email){
        System.out.println(contact.toString());
        User user = userService.findUser(email);
        user.addContact(contactService, contact);
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/contact/get/{ids}")
    public ResponseEntity<List<Contact>> getContacts(@PathVariable List<Long> ids){
        return new ResponseEntity<>(contactService.findContacts(ids), HttpStatus.OK);
    }

    @DeleteMapping("/contact/delete/{email}/{id}")
    @Transactional
    public ResponseEntity<?> deleteContact(@PathVariable("id") List<Long> ids, @PathVariable("email") String email) {
        User user = userService.findUser(email);
        for (int i = 0; i < ids.size(); i++){
            user.deleteContact(contactService, ids.get(i));
        }
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/contact/update/{field}/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable String field, @PathVariable Long id, @RequestBody Object change){
        Contact contact = contactService.findContact(id);
        Map<String, Object> res = new ObjectMapper().convertValue(change, HashMap.class);

        if(field.equals("name")){
            contact.setName(res.get("name").toString());
        }else if(field.equals("emails")){
            contact.setEmails(new ArrayList<String>((Collection<? extends String>)(res.get("emails"))));
        }

        contactService.saveContact(contact);

        return new ResponseEntity<>(contact, HttpStatus.OK);  ////////leave it as it is until common grounds is found with front
    }


}
