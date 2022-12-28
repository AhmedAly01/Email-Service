package com.Backend.Email.model.user;
import com.Backend.Email.model.email.Email;
import com.Backend.Email.services.userService;
import jakarta.persistence.*;
import java.io.Serializable;
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
    private List<Long> inbox;

    @ElementCollection
    private List<Long> sent;

    @ElementCollection
    private List<Long> deleted;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Long> getDeleted() {
        return deleted;
    }

    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
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

    public List<Long> getSent() {
        return sent;
    }

    public List<Long> getInbox() {
        return inbox;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", inbox=" + inbox +
                ", sent=" + sent +
                '}';
    }


    public void sendEmail(userService userService, Email email){
        this.sent.add(email.getId());
        email.addAlink();
        userService.updateUser(this);
        ArrayList<String> notExist = new ArrayList<>();
        List<String> toWho = email.getToWho();
        for(int i=0;i<toWho.size();i++){
            User toWhom = userService.findUser(toWho.get(i));
            if(toWhom != null) {
                toWhom.inbox.add(email.getId());
                userService.updateUser(toWhom);
                email.addAlink();
            }else
                notExist.add(toWho.get(i));
        }
        ///send a message to the inbox saying that the email doesn't exist /// to do
    }

    public boolean deleteEmail(Long id, String folderName, userService userService){
        boolean success = false;
        if(folderName.equals("inbox"))
            success = this.inbox.remove(Long.valueOf(id));
        else if (folderName.equals("sent")) {
            success = this.sent.remove(Long.valueOf(id));
        }
        if(success) {
            this.deleted.add(id);
            userService.updateUser(this);
            return true;
        }
        return false;

    }

    public boolean removeFromDeleted(Long id){
        return this.deleted.remove(Long.valueOf(id));
    }
}