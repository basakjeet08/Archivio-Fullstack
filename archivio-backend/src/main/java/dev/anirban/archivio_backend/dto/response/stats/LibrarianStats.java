package dev.anirban.archivio_backend.dto.response.stats;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LibrarianStats {
    private Integer totalLibrarians;
    private String mostActiveLibrarian;
}