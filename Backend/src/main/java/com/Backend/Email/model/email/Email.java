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
    @Column(unique = true, nullable = false)
    private Long id;
    private String fromWho;
    @ElementCollection
    private List<String> toWho;
    private String subject;
    private Date date;//////
    private String body;

    @Lob
    @Column(name="file", columnDefinition = "BLOB")
    private byte[] attachments; /////// Turn the object to string and save cuz sql retarted
    private boolean seen;//////
    private Integer importance;///////

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

    public void setAttachments(byte[] attachments) {
        this.attachments = attachments;
    }

    public void setRead(boolean read) {
        this.seen = read;
    }

    public void setPriority(Integer priority) {
        this.importance = priority;
    }

    public Long getId() {
        return id;
    }

    public String getSubject() {
        return subject;
    }

    public Date getDate() {
        return date;
    }

    public String getBody() {
        return body;
    }

    public byte[] getAttachments() {
        return attachments;
    }

    public boolean isSeen() {
        return seen;
    }

    public Integer getImportance() {
        return importance;
    }

    public String getFromWho() {
        return fromWho;
    }

    public List<String> getToWho() {
        return toWho;
    }
}
