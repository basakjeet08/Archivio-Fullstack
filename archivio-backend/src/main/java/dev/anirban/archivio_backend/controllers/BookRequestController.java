package dev.anirban.archivio_backend.controllers;

import dev.anirban.archivio_backend.constants.UrlConstants;
import dev.anirban.archivio_backend.dto.request.BookRequestDto;
import dev.anirban.archivio_backend.dto.response.ResponseWrapper;
import dev.anirban.archivio_backend.entity.BookRequest;
import dev.anirban.archivio_backend.service.BookRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class BookRequestController {

    // Injecting the book request service
    private final BookRequestService service;

    // This function handles the requests to request a book request
    @PostMapping(UrlConstants.BOOK_REQUEST_REQUESTED)
    public ResponseWrapper<BookRequest> handleBookRequest(
            @RequestBody BookRequestDto bookRequestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        BookRequest bookRequest = service.create(bookRequestDto, userDetails);
        return new ResponseWrapper<>("Book Requested Successfully !!", bookRequest);
    }

    // This function handles the fetching of the book request by the given id
    @GetMapping(UrlConstants.BOOK_REQUEST_FETCH_BY_ID)
    public ResponseWrapper<BookRequest> handleFetchById(@PathVariable String id) {
        BookRequest bookRequest = service.findById(id);
        return new ResponseWrapper<>("Book Fetched Successfully !!", bookRequest);
    }

    // This function handles the requests to approve a book request
    @PatchMapping(UrlConstants.BOOK_REQUEST_APPROVE)
    public ResponseWrapper<BookRequest> handleApproveBookRequest(
            @RequestBody BookRequestDto bookRequestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        BookRequest bookRequest = service.approveRequest(bookRequestDto, userDetails);
        return new ResponseWrapper<>("Book Request Approved Successfully !!", bookRequest);
    }

    // This function handles the request to return a book request
    @PatchMapping(UrlConstants.BOOK_REQUEST_RETURN)
    public ResponseWrapper<BookRequest> handleReturnBookRequest(
            @RequestBody BookRequestDto bookRequestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        BookRequest bookRequest = service.returnBook(bookRequestDto, userDetails);
        return new ResponseWrapper<>("Book Returned Successfully !!", bookRequest);
    }
}