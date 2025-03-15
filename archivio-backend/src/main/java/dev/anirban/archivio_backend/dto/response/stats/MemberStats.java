package dev.anirban.archivio_backend.dto.response.stats;


import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberStats {
    private Integer totalMembers;
    private List<String> mostFrequentMembers;
}