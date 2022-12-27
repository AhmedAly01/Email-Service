package com.Backend.Email.model.email;

import java.util.ArrayList;
import java.util.Date;

public class EmailBuilder {
    Email email;


    public EmailBuilder(String from, String to){
        this.email = new Email();
        this.email.setFrom(from);
    }

    public void setSubject(String subject) {
        this.email.setSubject(subject);
    }

    public void setDate(Date date) {
        this.email.setDate(date);
    }

    public void setBody(String body) {
        this.email.setBody(body);
    }

    public void setAttachments(ArrayList<Object> attachments) {
//        this.email.setAttachments(attachments);
    }

    public void setRead(boolean read) {
        this.email.setRead(read);
    }

    public void setPriority(Integer priority) {
        this.email.setPriority(priority);
    }

    public void setTo(ArrayList<String> to) {
//        this.email.setTo(to);
    }

    public Email getEmail(){
        return this.email;
    }

}
