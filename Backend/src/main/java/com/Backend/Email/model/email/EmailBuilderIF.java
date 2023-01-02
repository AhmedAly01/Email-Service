package com.Backend.Email.model.email;

import com.Backend.Email.services.AttachmentsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public interface EmailBuilderIF {
    public boolean setFrom(Object from);
    public boolean setSubject(Object subject);
    public boolean setDate(LocalDateTime date);
    public boolean setBody(Object body);
    public boolean setAttachments(List<MultipartFile> attachments, AttachmentsService attachmentsService) throws IOException;
    public void setRead(boolean read);
    public boolean setPriority(Object priority);
    public boolean setTo(Object to);
    public boolean setId(Object id);
    public boolean setName(String name);
    public void setLinks(int links);
    public Email getEmail();

}
