package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.request.IssueRequest;
import dev.anirban.archivio_backend.entity.Book;
import dev.anirban.archivio_backend.entity.BookRequest;
import dev.anirban.archivio_backend.entity.Librarian;
import dev.anirban.archivio_backend.entity.Member;
import dev.anirban.archivio_backend.exception.BookNotFound;
import dev.anirban.archivio_backend.exception.UnAuthorizedRequest;
import dev.anirban.archivio_backend.exception.UserNotFound;
import dev.anirban.archivio_backend.repo.BookRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookRequestService {

    // Injecting the dependencies for book, member and librarian
    private final BookRequestRepository bookRequestRepo;
    private final BookService bookService;
    private final MemberService memberService;
    private final LibrarianService librarianService;

    // This function creates a book request by the member
    public BookRequest create(IssueRequest issueRequest, UserDetails userDetails) {
        // Fetching the book details
        Book book = bookService.findById(issueRequest.getBookId());

        // If the book is already borrowed then we throw the error
        if (!book.getIsAvailable())
            throw new UnAuthorizedRequest();

        book.setIsAvailable(false);
        book.setTimesRequested(book.getTimesRequested() + 1);

        // Fetching the member details
        Member member = memberService
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFound(userDetails.getUsername()));

        // Updating the values in the member tables
        member.setBookRequestCount(member.getBookRequestCount() + 1);

        // Creating the book request object
        BookRequest bookRequest = BookRequest
                .builder()
                .requestedDate(Timestamp.valueOf(LocalDateTime.now()))
                .status(BookRequest.Status.REQUESTED)
                .book(book)
                .requester(member)
                .build();

        return bookRequestRepo.save(bookRequest);
    }

    // This function returns all the book requests
    public List<BookRequest> findAll() {
        return bookRequestRepo.findAll();
    }

    // This function returns the book request with the given id
    public BookRequest findById(String id) {
        return bookRequestRepo
                .findById(id)
                .orElseThrow(() -> new BookNotFound(id));
    }

    // This function fetches the books request by their requester id and status (optionally)
    public List<BookRequest> findByRequesterIdAndStatus(UserDetails userDetails, BookRequest.Status status) {
        return (status == null)
                ? bookRequestRepo.findByRequester_Email(userDetails.getUsername())
                : bookRequestRepo.findByRequester_EmailAndStatus(userDetails.getUsername(), status);
    }

    // This function approves the given book request
    public BookRequest approveRequest(IssueRequest issueRequest, UserDetails userDetails) {
        // Librarian Data
        Librarian librarian = librarianService
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFound(userDetails.getUsername()));

        // This is the book request object
        BookRequest bookRequest = findById(issueRequest.getId());

        // If the book request if not at requested state
        if (bookRequest.getStatus() != BookRequest.Status.REQUESTED)
            throw new UnAuthorizedRequest();

        // Updating the librarian data
        librarian.setRequestsApproved(librarian.getRequestsApproved() + 1);

        // Updating the necessary data
        bookRequest.setApprovedBy(librarian);
        bookRequest.setApprovedDate(Timestamp.valueOf(LocalDateTime.now()));
        bookRequest.setStatus(BookRequest.Status.APPROVED);
        return bookRequestRepo.save(bookRequest);
    }

    // This function returns the book by the member
    public BookRequest returnBook(IssueRequest issueRequest, UserDetails userDetails) {
        // Member Details
        Member member = memberService
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFound(userDetails.getUsername()));

        // Book Request Data
        BookRequest bookRequest = findById(issueRequest.getId());

        // If the book request is not at approved state then we throw the error
        if (bookRequest.getStatus() != BookRequest.Status.APPROVED)
            throw new UnAuthorizedRequest();

        // If the caller is not the same as the book requester
        if (!member.getEmail().equals(bookRequest.getRequester().getEmail()))
            throw new UnAuthorizedRequest();

        // Updating the necessary data
        bookRequest.setReturnDate(Timestamp.valueOf(LocalDateTime.now()));
        bookRequest.setStatus(BookRequest.Status.RETURNED);
        bookRequest.getBook().setIsAvailable(true);

        return bookRequestRepo.save(bookRequest);
    }
}
