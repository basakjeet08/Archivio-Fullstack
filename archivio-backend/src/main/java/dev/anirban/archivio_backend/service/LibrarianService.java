package dev.anirban.archivio_backend.service;


import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.entity.Librarian;
import dev.anirban.archivio_backend.entity.Role;
import dev.anirban.archivio_backend.exception.UnAuthorizedRequest;
import dev.anirban.archivio_backend.exception.UserNotFound;
import dev.anirban.archivio_backend.repo.LibrarianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LibrarianService {

    // This is the library repository created by spring data JPA
    private final LibrarianRepository librarianRepo;
    private final PasswordEncoder encoder;

    // This function creates a librarian and returns it
    public Librarian create(AuthRequest authRequest) {

        // Creating a librarian object
        Librarian librarian = Librarian
                .builder()
                .name(authRequest.getName())
                .email(authRequest.getEmail())
                .password(encoder.encode(authRequest.getPassword()))
                .role(Role.LIBRARIAN)
                .build();

        return librarianRepo.save(librarian);
    }

    // This function fetches the librarian data
    public Optional<Librarian> findByEmail(String email) {
        return librarianRepo.findByEmail(email);
    }

    // This function returns the list of Librarians registered in the portal
    public List<Librarian> findAll() {
        return librarianRepo.findAll();
    }

    // This function checks if the user has the given role
    public boolean hasRole(UserDetails userDetails, String role) {
        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(authority -> authority.equals("ROLE_" + role));
    }

    // This function is used to update the password upon login
    public Librarian update(AuthRequest authRequest, UserDetails userDetails) {

        // Checking if the user is making api calls for the same user data
        if (!authRequest.getEmail().equals(userDetails.getUsername()) && !hasRole(userDetails, Role.ADMIN.toString()))
            throw new UnAuthorizedRequest();

        Librarian savedLibrarian = findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new UserNotFound(authRequest.getEmail()));

        // Updating the password field if any found
        if (authRequest.getPassword() != null && !authRequest.getPassword().isBlank())
            savedLibrarian.setPassword(encoder.encode(authRequest.getPassword()));

        // Updating the name field if any found
        if (authRequest.getName() != null && !authRequest.getName().isBlank())
            savedLibrarian.setName(authRequest.getName());

        return librarianRepo.save(savedLibrarian);
    }

    // This function is used to delete the librarian data from the database
    public void delete(String id) {
        if (!librarianRepo.existsById(id))
            throw new UserNotFound(id);

        librarianRepo.deleteById(id);
    }
}