package dev.anirban.archivio_backend.controllers;

import dev.anirban.archivio_backend.constants.UrlConstants;
import dev.anirban.archivio_backend.dto.response.ResponseWrapper;
import dev.anirban.archivio_backend.entity.Book;
import dev.anirban.archivio_backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookController {

    // Injecting the service object
    private final BookService service;

    // Function which handler the creating of books
    @PostMapping(UrlConstants.BOOK_CREATE)
    public ResponseWrapper<Book> handleBookCreateRequest(@RequestBody Book book) {
        return new ResponseWrapper<>("Book Created Successfully !!", service.create(book));
    }

    // Function which handles the request to fetch all books
    @GetMapping(UrlConstants.BOOK_FETCH_ALL)
    public ResponseWrapper<List<Book>> handleBookFindAllRequest() {
        return new ResponseWrapper<>("Book List Fetched Successfully !!", service.findAllByOrderByTimesRequestedDesc());
    }

    // Function which handles the request to fetch the book by id
    @GetMapping(UrlConstants.BOOK_FETCH_BY_ID)
    public ResponseWrapper<Book> handleBookFindById(@PathVariable String id) {
        return new ResponseWrapper<>("Book fetched Successfully !!", service.findById(id));
    }

    // Function which handles update request for the book
    @PatchMapping(UrlConstants.BOOK_UPDATE)
    public ResponseWrapper<Book> handleBookUpdateRequest(@RequestBody Book book) {
        return new ResponseWrapper<>("Book Updated Successfully !!", service.update(book));
    }

    // Function which handles the delete book request
    @DeleteMapping(UrlConstants.BOOK_DELETE_BY_ID)
    public ResponseWrapper<Void> handleBookDeleteRequest(@PathVariable String id) {
        service.delete(id);
        return new ResponseWrapper<>("Book Deleted successfully !!", null);
    }
}
