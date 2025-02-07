package co.edu.ue.Auth;

import co.edu.ue.dto.LoginRequest;
import co.edu.ue.dto.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

  private final IAuthService service;

  @PostMapping(value = "/login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(service.login(request));
  }

  @PostMapping(value = "/register", produces = "application/json")
  public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
    AuthResponse token = service.register(request);

    return new ResponseEntity<>(token, HttpStatus.CREATED);
  }
}
