package dev.anirban.archivio_backend.dto.response.stats;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookStats {
    private Integer totalBooks;
    private List<String> mostRequestedBooks;
}