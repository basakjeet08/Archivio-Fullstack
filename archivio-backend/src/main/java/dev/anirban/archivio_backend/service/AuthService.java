package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.dto.response.UserDto;
import dev.anirban.archivio_backend.entity.User;
import dev.anirban.archivio_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {

    // This is user service which contains user specific business logic
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;


    // This function registers the user and returns the new user object
    public User registerUser(AuthRequest authRequest) {
        return userService.create(authRequest);
    }

    // This function generates the token wrapper for the user
    private UserDto generateTokenWrapper(User user) {
        String token = jwtService.generateToken(user, new Date(System.currentTimeMillis() + 1000 * 60 * 60));
        String refreshToken = jwtService.generateToken(user, new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24));

        return UserDto
                .builder()
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().toString())
                .token(token)
                .refreshToken(refreshToken)
                .build();
    }

    // This function logs in the user and returns the tokens for his subsequent requests
    public UserDto loginUser(AuthRequest authRequest) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        User savedUser = userService.findByEmail(authRequest.getEmail());
        return generateTokenWrapper(savedUser);
    }
}
