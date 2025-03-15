package dev.anirban.archivio_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Book_DB")
public class Book {

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "genre", nullable = false)
    private String genre;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable;

    @Column(name = "times_requested", nullable = false)
    private Integer timesRequested;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;
}