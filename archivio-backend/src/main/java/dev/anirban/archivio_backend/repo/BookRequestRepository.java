package dev.anirban.archivio_backend.repo;

import dev.anirban.archivio_backend.entity.BookRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRequestRepository extends JpaRepository<BookRequest, String> {
}