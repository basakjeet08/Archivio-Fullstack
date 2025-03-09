package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.exception.UserNotFound;
import dev.anirban.archivio_backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyUserDetails implements UserDetailsService {

    // This is the user repository which helps to query data for the User Tables
    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo
                .findByEmail(username)
                .orElseThrow(() -> new UserNotFound(username));
    }
}