package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.exception.UserNotFound;
import dev.anirban.archivio_backend.repo.AdminRepository;
import dev.anirban.archivio_backend.repo.LibrarianRepository;
import dev.anirban.archivio_backend.repo.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MyUserDetails implements UserDetailsService {

    // This is the user repository which helps to query data for the User Tables
    private final AdminRepository adminRepo;
    private final LibrarianRepository librarianRepo;
    private final MemberRepository memberRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return adminRepo
                .findByEmail(username)
                .map(UserDetails.class::cast)
                .or(() -> librarianRepo.findByEmail(username))
                .or(() -> memberRepo.findByEmail(username))
                .orElseThrow(() -> new UserNotFound(username));
    }
}