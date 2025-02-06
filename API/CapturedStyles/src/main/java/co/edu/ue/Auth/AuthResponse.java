package co.edu.ue.Auth;

import lombok.*;

@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class AuthResponse {
  String token;
}
