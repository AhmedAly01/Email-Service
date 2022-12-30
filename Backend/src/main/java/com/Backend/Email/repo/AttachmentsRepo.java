package com.Backend.Email.repo;

import com.Backend.Email.model.attachment.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AttachmentsRepo extends JpaRepository<Attachment, Long> {
    Optional<Attachment> findAttachmentById(Long id);
}
