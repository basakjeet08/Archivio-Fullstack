package dev.anirban.archivio_backend.repo;

import dev.anirban.archivio_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, String> {
    List<Book> findAllByOrderByTimesRequestedDesc();
}