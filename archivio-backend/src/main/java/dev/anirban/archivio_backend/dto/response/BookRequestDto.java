package dev.anirban.archivio_backend.dto.response;

import dev.anirban.archivio_backend.entity.Book;
import dev.anirban.archivio_backend.entity.BookRequest;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookRequestDto {
    private String id;
    private Timestamp requestedDate;
    private Timestamp approvedDate;
    private Timestamp returnDate;
    private BookRequest.Status status;
    private Book book;
    private UserDto requester;
    private UserDto approvedBy;
}