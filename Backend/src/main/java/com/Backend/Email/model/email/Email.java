package com.Backend.Email.model.email;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;


@Entity
public class Email implements Serializable {
    @Id
    @Column(nullable = false)
    private String from;
    private String to; ///////////////
    private String subject;
    private Date date;
    private String body;
    private Object attachments;
    private boolean read;
    private Integer priority;

    public Email() {
        this.from = null;
        this.to = null;
        this.subject = null;
        this.date = null;
        this.body = null;
        this.attachments = null;
        this.read = false;
        this.priority = null;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setAttachments(Object attachments) {
        this.attachments = attachments;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    @Override
    public String toString() {
        return "Email{" +
                "from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", subject='" + subject + '\'' +
                ", date=" + date +
                ", body='" + body + '\'' +
                ", attachments=" + attachments +
                ", read=" + read +
                ", priority=" + priority +
                '}';
    }
}
