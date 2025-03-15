package dev.anirban.archivio_backend.dto.response.stats;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatsDto {
    private BookStats bookStats;
    private MemberStats memberStats;
}