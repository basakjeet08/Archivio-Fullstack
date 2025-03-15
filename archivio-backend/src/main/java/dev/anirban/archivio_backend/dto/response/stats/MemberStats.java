package dev.anirban.archivio_backend.dto.response.stats;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberStats {
    private Integer totalMembers;
    private String mostFrequentMember;
}