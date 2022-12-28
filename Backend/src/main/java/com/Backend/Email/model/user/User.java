package com.Backend.Email.model.user;
import com.Backend.Email.model.email.Email;
import com.Backend.Email.services.UserService;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
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
    private List<Long> draft;

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

    public List<Long> getDraft() {
        return draft;
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
                ", draft=" + draft +
                ", deleted=" + deleted +
                '}';
    }

    public void sendEmail(UserService userService, Email email){
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
                userService.saveUser(toWhom);
                email.addAlink();
            }else
                notExist.add(toWho.get(i));
        }
        ///send a message to the inbox saying that the email doesn't exist /// to do
    }

    public void addToDraft(Long id, UserService userService){
        if(!this.draft.contains(id))
            this.draft.add(id);
        userService.saveUser(this);
    }

    public boolean deleteEmail(Long id, String folderName, UserService userService){
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
            userService.saveUser(this);
            return true;
        }
        return false;

    }

    public boolean removeFromDeleted(Long id){
        return this.deleted.remove(Long.valueOf(id));
    }
}