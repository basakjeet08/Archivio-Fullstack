package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.entity.Role;
import dev.anirban.archivio_backend.entity.User;
import dev.anirban.archivio_backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    // This is the user repository created by spring data jpa for any database operation related to the user table
    private final UserRepository userRepo;

    // Creating a new user and returning the user object
    public User create(AuthRequest authRequest) {

        // Creating a new User Object
        User user = User
                .builder()
                .name(authRequest.getName())
                .email(authRequest.getEmail())
                .password(authRequest.getPassword())
                .role(Role.valueOf(authRequest.getRole()))
                .build();

        return userRepo.save(user);
    }
}
