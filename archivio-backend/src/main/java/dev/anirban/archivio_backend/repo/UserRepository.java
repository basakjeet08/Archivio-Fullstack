package dev.anirban.archivio_backend.repo;

import dev.anirban.archivio_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
