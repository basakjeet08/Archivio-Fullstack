package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.entity.Admin;
import dev.anirban.archivio_backend.entity.Role;
import dev.anirban.archivio_backend.repo.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    // This is the admin repository created by spring data JPA
    private final AdminRepository adminRepo;
    private final PasswordEncoder encoder;

    // This function creates an Admin and returns it
    public Admin create(AuthRequest authRequest) {

        // Creating an Admin object
        Admin admin = Admin
                .builder()
                .name(authRequest.getName())
                .email(authRequest.getEmail())
                .password(encoder.encode(authRequest.getPassword()))
                .role(Role.ADMIN)
                .build();

        return adminRepo.save(admin);
    }

    // This function fetches the admin with the given email
    public Optional<Admin> findByEmail(String email) {
        return adminRepo.findByEmail(email);
    }
}
