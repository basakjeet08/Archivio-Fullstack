package dev.anirban.archivio_backend.repo;

import dev.anirban.archivio_backend.entity.Librarian;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LibrarianRepository extends JpaRepository<Librarian, String> {
    Optional<Librarian> findByEmail(String email);
}