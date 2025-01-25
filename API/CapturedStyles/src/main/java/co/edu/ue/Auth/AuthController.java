package co.edu.ue.controller.Auth;

import co.edu.ue.Auth.AuthResponse;
import co.edu.ue.Auth.LoginRequest;
import co.edu.ue.Auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  @PostMapping(value = "/login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping(value = "/login")
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
