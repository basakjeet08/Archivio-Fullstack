package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.request.AuthRequest;
import dev.anirban.archivio_backend.entity.Member;
import dev.anirban.archivio_backend.entity.Role;
import dev.anirban.archivio_backend.repo.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    // This is the member repository created by Spring Data JPA
    private final MemberRepository memberRepo;
    private final PasswordEncoder encoder;

    // This function creates a member request and returns it
    public Member create(AuthRequest authRequest) {

        // Creating a Member Object
        Member member = Member
                .builder()
                .name(authRequest.getName())
                .email(authRequest.getEmail())
                .password(encoder.encode(authRequest.getPassword()))
                .role(Role.MEMBER)
                .build();

        return memberRepo.save(member);
    }

    // This function fetches the member data
    public Optional<Member> findByEmail(String email) {
        return memberRepo.findByEmail(email);
    }
}
