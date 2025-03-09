package dev.anirban.archivio_backend.controllers;

import dev.anirban.archivio_backend.constants.UrlConstants;
import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.dto.response.ResponseWrapper;
import dev.anirban.archivio_backend.dto.response.UserDto;
import dev.anirban.archivio_backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController {

    // This is the auth service which acts as a business logic layer for this controller
    private final AuthService service;

    // This function handles any register user request and returns the new registered user object
    @PostMapping(UrlConstants.REGISTER_ENDPOINT)
    public ResponseWrapper<UserDto> handleRegistration(@RequestBody AuthRequest authRequest) {
        UserDto user = service.registerUser(authRequest).toUserDto();
        return new ResponseWrapper<>("User Created Successfully", user);
    }
}