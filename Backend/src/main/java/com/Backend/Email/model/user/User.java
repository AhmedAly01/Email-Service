package com.Backend.Email.model.user;
import com.Backend.Email.model.contact.Contact;
import com.Backend.Email.model.email.Email;
import com.Backend.Email.model.email.EmailBuilder;
import com.Backend.Email.model.email.EmailBuilderIF;
import com.Backend.Email.services.ContactService;
import com.Backend.Email.services.EmailService;
import com.Backend.Email.services.UserService;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "User")
public class User implements Serializable {
    @Id
    @Column(nullable = false)
    private String email;
    private String name;

    private String password;

    @ElementCollection
    private List<Long> contacts;

    @ElementCollection
    private List<Long> inbox;

    @ElementCollection
    private List<Long> sent;

    @ElementCollection
    private List<Long> draft;

    @ElementCollection
    private List<Long> deleted;

    @ElementCollection
    private List<Long> notSeen;

    @ElementCollection
    private List<LocalDateTime> deletionTime;

    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public List<LocalDateTime> getDeletionTime() {
        return deletionTime;
    }

    public List<Long> getNotSeen() {
        return notSeen;
    }

    public void setNotSeen(List<Long> notSeen) {
        this.notSeen = notSeen;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Long> getDeleted() {
        return deleted;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Long> getDraft() {
        return draft;
    }

    public List<Long> getSent() {
        return sent;
    }

    public List<Long> getInbox() {
        return inbox;
    }

    public List<Long> getContacts() {
        return contacts;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", contacts=" + contacts +
                ", inbox=" + inbox +
                ", sent=" + sent +
                ", draft=" + draft +
                ", deleted=" + deleted +
                '}';
    }

    public void sendEmail(UserService userService, Email email, EmailService emailService) {
        email.setLinks(0);
        if(email.getId() != null){
            this.draft.remove(Long.valueOf(email.getId()));
        }
        this.sent.add(email.getId());
        email.addAlink();
        userService.saveUser(this);
        ArrayList<String> notExist = new ArrayList<>();
        List<String> toWho = email.getToWho();
        for(int i=0;i<toWho.size();i++){
            User toWhom = userService.findUser(toWho.get(i));
            if(toWhom != null) {
                toWhom.inbox.add(email.getId());
                toWhom.addToNotSeen(email.getId());
                userService.saveUser(toWhom);
                email.addAlink();
            }else
                notExist.add(toWho.get(i));
        }
        ///send a message to the inbox saying that the email doesn't exist /// to do
        if(!notExist.isEmpty()){
            EmailBuilderIF emailBuilder = new EmailBuilder();
            emailBuilder.setFrom("DOE@Amail.com");
            emailBuilder.setTo(Arrays.asList(this.email)); //////////// fixxxx
            emailBuilder.setSubject("Email not valid");
            String body = "The following emails your were trying to message are non existent:";
            for(int i=0;i<notExist.size();i++){
                body = body.concat("\n" + notExist.get(i));
            }
            emailBuilder.setBody(body);
            emailBuilder.setPriority(0);
            emailBuilder.setDate(LocalDateTime.now());
            emailBuilder.setName("AMail support team");
            emailBuilder.setLinks(1);
            Email alertEmail = emailService.addEmail(emailBuilder.getEmail());
            this.inbox.add(alertEmail.getId());
            this.addToNotSeen(alertEmail.getId());
        }
    }

    public void addToDraft(Long id, UserService userService){
        if(!this.draft.contains(id))
            this.draft.add(id);
        userService.saveUser(this);
    }

    public boolean deleteEmail(Long id, String folderName){
        boolean success = false;
        if(folderName.equals("inbox"))
            success = this.inbox.remove(Long.valueOf(id));
        else if (folderName.equals("sent")) {
            success = this.sent.remove(Long.valueOf(id));
        } else if (folderName.equals("draft")) {
            success = this.draft.remove(Long.valueOf(id));
        }

        if(success) {
            this.deleted.add(id);
            this.deletionTime.add(LocalDateTime.now());
            return true;
        }
        return false;

    }

    public void removeFromDeleted(Long id){
        int index = this.deleted.indexOf(id);
        this.deleted.remove(index);
        this.deletionTime.remove(index);

        index = this.notSeen.indexOf(id);
        if(index != -1){
            this.removeFromNotSeen(id);
        }
    }


    public void addContact(ContactService contactService, Contact contact){
        contact = contactService.saveContact(contact);
        this.contacts.add(contact.getId());
    }

    public void deleteContact(ContactService contactService, Long id){
        this.contacts.remove(Long.valueOf(id));
        contactService.deleteContact(id);
    }


    public void recoverEmails(List<Email> emails){
        for(int i=0;i<emails.size();i++){
            Email currEmail = emails.get(i);
            int index = this.deleted.indexOf(currEmail.getId());
            this.deleted.remove(index);
            this.deletionTime.remove(index);
            if(currEmail.getFromWho().equals(email) && !this.sent.contains(Long.valueOf(currEmail.getId()))){
                this.sent.add(currEmail.getId());
            }else{
                this.inbox.add(currEmail.getId());
            }
        }
    }

    public void addToNotSeen(Long id){
        this.notSeen.add(id);
    }

    public void removeFromNotSeen(Long id){
        this.notSeen.remove(Long.valueOf(id));
    }
}