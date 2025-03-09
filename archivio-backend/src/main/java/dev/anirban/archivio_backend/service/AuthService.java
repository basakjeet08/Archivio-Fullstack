package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.dto.response.UserDto;
import dev.anirban.archivio_backend.entity.Admin;
import dev.anirban.archivio_backend.exception.UserNotFound;
import dev.anirban.archivio_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {

    // This is user service which contains user specific business logic
    private final AdminService adminService;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;


    // This function registers an admin
    public Admin registerAdmin(AuthRequest authRequest) {
        return adminService.create(authRequest);
    }

    // This function generates the token wrapper for the user
    private String[] generateTokenWrapper(UserDetails user) {
        String token = jwtService.generateToken(user, new Date(System.currentTimeMillis() + 1000 * 60 * 60));
        String refreshToken = jwtService.generateToken(user, new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24));

        return new String[]{token, refreshToken};
    }

    // This function logs in the user and returns the tokens for his subsequent requests
    public UserDto loginUser(AuthRequest authRequest) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        Admin admin = adminService
                .findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new UserNotFound(authRequest.getEmail()));

        String[] tokens = generateTokenWrapper(admin);

        return UserDto
                .builder()
                .name(admin.getName())
                .email(admin.getEmail())
                .role(admin.getRole().toString())
                .token(tokens[0])
                .refreshToken(tokens[1])
                .build();
    }
}
