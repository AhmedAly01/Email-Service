package com.Backend.Email.model.email;

import jakarta.persistence.*;

import jakarta.persistence.Id;
import org.springframework.util.SerializationUtils;

import java.io.File;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
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
    private LocalDateTime date;//////
    private String body;
    @Lob
    @Column(name="file", columnDefinition = "BLOB")
    private byte[] attachments; /////// Turn the object to string and save cuz sql retarted
    private boolean seen;//////
    private Integer importance;///////

    private Integer links;





    public Email() {
        this.links = 0;
    }

    public Long getId() {
        return id;
    }

    public String getFromWho() {
        return fromWho;
    }

    public List<String> getToWho() {
        return toWho;
    }

    public String getSubject() {
        return subject;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public String getBody() {
        return body;
    }

    public File getAttachments() {

        return (File) SerializationUtils.deserialize(attachments);
    }

    public boolean isSeen() {
        return seen;
    }

    public Integer getImportance() {
        return importance;
    }

    public Integer getLinks() {
        return links;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFromWho(String fromWho) {
        this.fromWho = fromWho;
    }

    public void setToWho(List<String> toWho) {
        this.toWho = toWho;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setAttachments(byte[] attachments) {
        this.attachments = attachments;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }

    public void setImportance(Integer importance) {
        this.importance = importance;
    }

    public void setLinks(Integer links) {
        this.links = links;
    }

    public Integer removeAlink(){
        links = links - 1;
        return links;
    }

    public Integer addAlink(){
        links = links + 1;
        return links;
    }

    @Override
    public String toString() {
        return "Email{" +
                "id=" + id +
                ", fromWho='" + fromWho + '\'' +
                ", toWho=" + toWho +
                ", subject='" + subject + '\'' +
                ", date=" + date +
                ", body='" + body + '\'' +
                ", attachments=" + Arrays.toString(attachments) +
                ", seen=" + seen +
                ", importance=" + importance +
                ", links=" + links +
                '}';
    }
}
