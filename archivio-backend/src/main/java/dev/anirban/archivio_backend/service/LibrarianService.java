package dev.anirban.archivio_backend.service;


import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.entity.Librarian;
import dev.anirban.archivio_backend.entity.Role;
import dev.anirban.archivio_backend.repo.LibrarianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
}
