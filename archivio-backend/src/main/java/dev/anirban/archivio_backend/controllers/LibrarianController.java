package dev.anirban.archivio_backend.controllers;

import dev.anirban.archivio_backend.constants.UrlConstants;
import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.dto.response.ResponseWrapper;
import dev.anirban.archivio_backend.dto.response.UserDto;
import dev.anirban.archivio_backend.entity.Librarian;
import dev.anirban.archivio_backend.service.LibrarianService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LibrarianController {

    // Injecting the library service
    private final LibrarianService service;

    // This function handles the request to fetch all librarian data
    @GetMapping(UrlConstants.LIBRARIAN_FETCH_ALL)
    public ResponseWrapper<List<UserDto>> handleFetchAllLibrarianRequest() {
        List<UserDto> librarianList = service
                .findAll()
                .stream()
                .map(Librarian::toUserDto)
                .toList();

        return new ResponseWrapper<>("Librarian List Fetched Successfully !!", librarianList);
    }

    // This function handles the request to fetch librarian data by their id
    @GetMapping(UrlConstants.LIBRARIAN_FETCH_BY_ID)
    public ResponseWrapper<UserDto> handleFetchByIdRequest(@PathVariable String id) {
        UserDto librarian = service.findById(id).toUserDto();
        return new ResponseWrapper<>("Librarian Data Fetched Successfully !!", librarian);
    }

    // This function handles the librarian update request
    @PatchMapping(UrlConstants.LIBRARIAN_UPDATE)
    public ResponseWrapper<UserDto> handleUpdateRequest(@RequestBody AuthRequest authRequest) {
        UserDto librarian = service.update(authRequest).toUserDto();
        return new ResponseWrapper<>("Librarian Updated Successfully !!", librarian);
    }

    // This function handles the librarian delete request
    @DeleteMapping(UrlConstants.LIBRARIAN_DELETE)
    public ResponseWrapper<Void> handleDeleteRequest(@PathVariable String id) {
        service.delete(id);
        return new ResponseWrapper<>("Librarian Deleted Successfully !!", null);
    }
}
