package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    // This is user service which contains user specific business logic
    private final UserService userService;

    // This function registers the user and returns the new user object
    public User registerUser(AuthRequest authRequest) {
        return userService.create(authRequest);
    }
}
