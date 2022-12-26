package com.Backend.Email.model.email;

import java.util.Date;

public class EmailBuilder {
    private String from;
    private String to; ///////////////
    private String subject;
    private Date date;
    private String body;
    private Object attachments;
    private boolean read;
    private Integer priority;

    Email email;


    public EmailBuilder(String from, String to){
        this.email = new Email();
        this.email.setFrom(from);
        this.email.setTo(to);
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

    public void setAttachments(Object attachments) {
        this.email.setAttachments(attachments);
    }

    public void setRead(boolean read) {
        this.email.setRead(read);
    }

    public void setPriority(Integer priority) {
        this.email.setPriority(priority);
    }

    public Email getEmail(){
        return this.email;
    }

}
