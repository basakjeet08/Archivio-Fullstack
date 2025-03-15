package dev.anirban.archivio_backend.dto.response.stats;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookStats {
    private Integer totalBooks;
    private String mostRequestedBook;
}