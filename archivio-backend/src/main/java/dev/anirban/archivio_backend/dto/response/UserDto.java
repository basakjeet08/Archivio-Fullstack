package dev.anirban.archivio_backend.dto.response;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String name;
    private String email;
    private String role;

    private String token;
    private String refreshToken;
}
