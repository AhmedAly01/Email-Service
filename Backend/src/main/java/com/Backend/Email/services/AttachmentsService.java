package com.Backend.Email.services;

//import com.Backend.Email.repo.AttachmentsRepo;
import com.Backend.Email.model.attachment.Attachment;
import com.Backend.Email.repo.AttachmentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

@Service
public class AttachmentsService {

    private final AttachmentsRepo attachmentsRepo;

    @Autowired
    public AttachmentsService(AttachmentsRepo attachmentsRepo) {
        this.attachmentsRepo = attachmentsRepo;
    }


    public Attachment store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Attachment attachment = new Attachment(fileName, file.getContentType(), file.getBytes());
        return attachmentsRepo.save(attachment);
    }

    public Attachment getAttachment(Long id){
        return attachmentsRepo.findById(id).orElse(null);
    }

    public Stream<Attachment> getAttachments(List<Long> id){
        return attachmentsRepo.findAllById(id).stream();
    }

    public Stream<Attachment> getAllFiles(){
        return attachmentsRepo.findAll().stream();
    }
}
