package com.Backend.Email.model.email;

import com.Backend.Email.services.AttachmentsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class EmailBuilder {
    Email email;


    public EmailBuilder(){
        this.email = new Email();
    }

    public boolean setFrom(Object from){
        if(from == null)
            return false;
        this.email.setFromWho(from.toString());
        return true;
    }

    public boolean setSubject(Object subject) {
        if(subject == null)
            return false;
        this.email.setSubject(subject.toString());
        return true;
    }

    public boolean setDate(LocalDateTime date) {
        if(date == null)
            return false;
        this.email.setDate(date);
        return true;
    }

    public boolean setBody(Object body) {
        if(body == null)
            return false;
        this.email.setBody(body.toString());
        return true;
    }

    public boolean setAttachments(List<MultipartFile> attachments, AttachmentsService attachmentsService) throws IOException {
        if(attachments == null)
            return false;
        List<Long> ids = new ArrayList<>();

        for(int i=0;i<attachments.size();i++){
            ids.add(attachmentsService.store(attachments.get(i)).getId());
        }
        this.email.setAttachments(ids);
        return true;
    }

    public void setRead(boolean read) {
        this.email.setSeen(read);
    }

    public boolean setPriority(Object priority) {
        if(priority == null)
            return false;
        this.email.setImportance(Integer.valueOf(priority.toString()));
        return true;
    }

    public boolean setTo(Object to) {
        if(to == null)
            return false;
        this.email.setToWho(new ArrayList<String>((Collection<? extends String>)(to)));
        return true;
    }

    public boolean setId(Object id){
        if(id == null)
            return false;
        this.email.setId(Long.valueOf(id.toString()));
        return true;
    }

    public boolean setName(String name){
        this.email.setName(name);
        return true;
    }

    public void setLinks(int links){
        this.email.setLinks(links);
    }

    public Email getEmail(){
        return this.email;
    }

}
