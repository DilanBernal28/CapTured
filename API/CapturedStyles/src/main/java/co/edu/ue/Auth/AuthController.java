package co.edu.ue.Auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final IAuthService service;

  @PostMapping(value = "ldkjsf")
  public ResponseEntity<String> getAuth() {
    return ResponseEntity.ok("puto");
  }

  @PostMapping(value = "/login")
  public ResponseEntity<String> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok("hola");
//    return ResponseEntity.ok(service.login(loginRequest));
  }

  @PostMapping(value = "/register")
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.register(request));
  }
}
