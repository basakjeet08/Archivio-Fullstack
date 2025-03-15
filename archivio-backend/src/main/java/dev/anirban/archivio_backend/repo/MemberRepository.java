package dev.anirban.archivio_backend.repo;

import dev.anirban.archivio_backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByEmail(String email);

    List<Member> findAllByOrderByBookRequestCountDesc();
}
