package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.dto.response.UserDto;
import dev.anirban.archivio_backend.entity.Admin;
import dev.anirban.archivio_backend.entity.Librarian;
import dev.anirban.archivio_backend.entity.Member;
import dev.anirban.archivio_backend.exception.EmailAlreadyExists;
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
    private final LibrarianService librarianService;
    private final MemberService memberService;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    // This function checks if the given email is already present in the Admin or Librarian or Member Database
    public boolean emailAlreadyExists(String email) {
        return adminService.findByEmail(email).isPresent() || librarianService.findByEmail(email).isPresent();
    }

    // This function registers an admin
    public Admin registerAdmin(AuthRequest authRequest) {
        if (emailAlreadyExists(authRequest.getEmail())) {
            throw new EmailAlreadyExists(authRequest.getEmail());
        }

        return adminService.create(authRequest);
    }

    // This function registers a librarian
    public Librarian registerLibrarian(AuthRequest authRequest) {
        if (emailAlreadyExists(authRequest.getEmail())) {
            throw new EmailAlreadyExists(authRequest.getEmail());
        }

        return librarianService.create(authRequest);
    }

    // This function registers a Member
    public Member registerMember(AuthRequest authRequest) {
        if (emailAlreadyExists(authRequest.getEmail())) {
            throw new EmailAlreadyExists(authRequest.getEmail());
        }

        return memberService.create(authRequest);
    }

    // This function generates the token wrapper for the user
    private String[] generateTokenWrapper(UserDetails user) {
        String token = jwtService.generateToken(user, new Date(System.currentTimeMillis() + 1000 * 60 * 60));
        String refreshToken = jwtService.generateToken(user, new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24));

        return new String[]{token, refreshToken};
    }

    // This function returns the user details object after searching for all the services
    private UserDetails getUserDetails(String email) {
        return adminService
                .findByEmail(email)
                .map(UserDetails.class::cast)
                .or(() -> librarianService.findByEmail(email))
                .or(() -> memberService.findByEmail(email))
                .orElseThrow(() -> new UserNotFound(email));
    }

    // This function returns the user dto after searching all the services
    private UserDto getUserDto(String email) {
        return adminService
                .findByEmail(email)
                .map(Admin::toUserDto)
                .or(() -> librarianService.findByEmail(email).map(Librarian::toUserDto))
                .or(() -> memberService.findByEmail(email).map(Member::toUserDto))
                .orElseThrow(() -> new UserNotFound(email));
    }

    // This function logs in the user and returns the tokens for his subsequent requests
    public UserDto loginUser(AuthRequest authRequest) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );

        // Fetching the user Details Object and creating the token wrapper and user Dto
        UserDetails userDetails = getUserDetails(authRequest.getEmail());
        String[] tokens = generateTokenWrapper(userDetails);
        UserDto user = getUserDto(authRequest.getEmail());

        // Setting the token in the user dto
        user.setToken(tokens[0]);
        user.setRefreshToken(tokens[1]);

        return user;
    }
}
