package dev.anirban.archivio_backend.controllers;

import dev.anirban.archivio_backend.constants.UrlConstants;
import dev.anirban.archivio_backend.dto.request.IssueRequest;
import dev.anirban.archivio_backend.dto.response.BookRequestDto;
import dev.anirban.archivio_backend.dto.response.ResponseWrapper;
import dev.anirban.archivio_backend.entity.BookRequest;
import dev.anirban.archivio_backend.service.BookRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookRequestController {

    // Injecting the book request service
    private final BookRequestService service;

    // This function handles the requests to request a book request
    @PostMapping(UrlConstants.BOOK_REQUEST_REQUESTED)
    public ResponseWrapper<BookRequestDto> handleBookRequest(
            @RequestBody IssueRequest issueRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        BookRequestDto bookRequest = service.create(issueRequest, userDetails).toBookRequestDto();
        return new ResponseWrapper<>("Book Requested Successfully !!", bookRequest);
    }

    // This function handles the fetching of all the book requests
    @GetMapping(UrlConstants.BOOK_REQUEST_FETCH_ALL)
    public ResponseWrapper<List<BookRequestDto>> handleFetchAll() {
        List<BookRequestDto> bookRequests = service
                .findAll()
                .stream()
                .map(BookRequest::toBookRequestDto)
                .toList();

        return new ResponseWrapper<>("Book Requests list fetched Successfully !!", bookRequests);
    }

    // This function handles the fetching of the book request by the given id
    @GetMapping(UrlConstants.BOOK_REQUEST_FETCH_BY_ID)
    public ResponseWrapper<BookRequestDto> handleFetchById(@PathVariable String id) {
        BookRequestDto bookRequest = service.findById(id).toBookRequestDto();
        return new ResponseWrapper<>("Book Fetched Successfully !!", bookRequest);
    }

    // This function handles the requests to approve a book request
    @PatchMapping(UrlConstants.BOOK_REQUEST_APPROVE)
    public ResponseWrapper<BookRequestDto> handleApproveBookRequest(
            @RequestBody IssueRequest issueRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        BookRequestDto bookRequest = service.approveRequest(issueRequest, userDetails).toBookRequestDto();
        return new ResponseWrapper<>("Book Request Approved Successfully !!", bookRequest);
    }

    // This function handles the request to return a book request
    @PatchMapping(UrlConstants.BOOK_REQUEST_RETURN)
    public ResponseWrapper<BookRequestDto> handleReturnBookRequest(
            @RequestBody IssueRequest issueRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        BookRequestDto bookRequest = service.returnBook(issueRequest, userDetails).toBookRequestDto();
        return new ResponseWrapper<>("Book Returned Successfully !!", bookRequest);
    }
}