package dev.anirban.archivio_backend.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "Admin_DB")
public class Admin extends User {
}
