package com.Backend.Email.model.email;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class EmailBuilder {
    Email email;


    public EmailBuilder(){
        this.email = new Email();
    }

    public  void setFrom(String from){
        this.email.setFrom(from);
    }

    public void setSubject(String subject) {
        this.email.setSubject(subject);
    }

    public void setDate(LocalDateTime date) {
        this.email.setDate(date);
    }

    public void setBody(String body) {
        this.email.setBody(body);
    }

    public void setAttachments(byte[] attachments) {
        this.email.setAttachments(attachments);
    }

    public void setRead(boolean read) {
        this.email.setRead(read);
    }

    public void setPriority(Integer priority) {
        this.email.setPriority(priority);
    }

    public void setTo(ArrayList<String> to) {
        this.email.setTo(to);
    }

    public Email getEmail(){
        return this.email;
    }

}
