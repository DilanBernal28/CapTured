package co.edu.ue.Auth;

import lombok.*;

@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthResponse {
  String token;
}
