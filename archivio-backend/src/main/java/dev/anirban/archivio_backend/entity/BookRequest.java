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
@Table(name = "Book_Request_DB")
public class BookRequest {

    public enum Status {
        REQUESTED, APPROVED, RETURNED
    }

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "requested_date", nullable = false)
    private Timestamp requestedDate;

    @Column(name = "approved_date")
    private Timestamp approvedDate;

    @Column(name = "return_date")
    private Timestamp returnDate;

    @Column(name = "status", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Status status;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "requester_id", nullable = false)
    private Member requester;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "approved_by_id")
    private Librarian approvedBy;
}
