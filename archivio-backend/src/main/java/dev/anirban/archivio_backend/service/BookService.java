package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.entity.Book;
import dev.anirban.archivio_backend.exception.BookNotFound;
import dev.anirban.archivio_backend.repo.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepo;

    // This function creates a book object and returns it
    public Book create(Book book) {

        // Creating a new Book to store it in the database
        Book createdBook = Book
                .builder()
                .title(book.getTitle())
                .description(book.getDescription())
                .genre(book.getGenre())
                .isAvailable(true)
                .timesRequested(0)
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                .build();

        return bookRepo.save(createdBook);
    }

    // This function returns the book with the same id
    public Book findById(String id) {
        return bookRepo
                .findById(id)
                .orElseThrow(() -> new BookNotFound(id));
    }

    // This function fetches all the books sorted by the most to the least requested book
    public List<Book> findAllByOrderByTimesRequestedDesc() {
        return bookRepo.findAllByOrderByTimesRequestedDesc();
    }

    // This function updates the book in the database
    public Book update(Book updatedBook) {
        Book savedBook = findById(updatedBook.getId());

        // Updating the data accordingly
        if (updatedBook.getTitle() != null)
            savedBook.setTitle(updatedBook.getTitle());

        if (updatedBook.getDescription() != null)
            savedBook.setDescription(updatedBook.getDescription());

        if (updatedBook.getGenre() != null)
            savedBook.setGenre(updatedBook.getGenre());

        savedBook.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));

        return bookRepo.save(savedBook);
    }

    // This function deletes the book data from the database
    public void delete(String id) {
        Book savedBook = findById(id);
        bookRepo.delete(savedBook);
    }
}