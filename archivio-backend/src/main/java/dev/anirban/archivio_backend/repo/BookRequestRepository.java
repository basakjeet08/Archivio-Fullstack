package dev.anirban.archivio_backend.repo;

import dev.anirban.archivio_backend.entity.BookRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRequestRepository extends JpaRepository<BookRequest, String> {
    List<BookRequest> findByRequester_Email(String requesterEmail);

    List<BookRequest> findByRequester_EmailAndStatus(String requesterEmail, BookRequest.Status status);
}