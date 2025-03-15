package dev.anirban.archivio_backend.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "Librarian_DB")
public class Librarian extends User {
}
