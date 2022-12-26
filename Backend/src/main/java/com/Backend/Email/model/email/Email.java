package com.Backend.Email.model.email;

import jakarta.persistence.*;

import jakarta.persistence.Id;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "massages")
public class Email implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String fromWho;
    @ElementCollection
    private ArrayList<String> toWho; ///////////////
    private String subject;
    private Date date;
    private String body;

    @ElementCollection
    private ArrayList<String> attachments; /////// Turn the object to string and save cuz sql retarted
    private boolean seen;
    private Integer importance;

    public void setFrom(String from) {
        this.fromWho = from;
    }

    public void setTo(ArrayList<String> to) {
        this.toWho = to;
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

//    public void setAttachments(ArrayList<Object> attachments) {
//        this.attachments = attachments;
//    }

    public void setRead(boolean read) {
        this.seen = read;
    }

    public void setPriority(Integer priority) {
        this.importance = priority;
    }

    public Long getId() {
        return id;
    }

    public String getFromWho() {
        return fromWho;
    }

    public ArrayList<String> getToWho() {
        return toWho;
    }
}
