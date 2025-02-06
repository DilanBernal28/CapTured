package co.edu.ue.Auth;

import co.edu.ue.Jwt.JwtService;
import co.edu.ue.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import co.edu.ue.model.User;

import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService{

  private final IUserService userService;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authManager;

  @Override
  public AuthResponse login(LoginRequest request) {
    authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    UserDetails user = userService.getByUsername(request.getUsername()).orElseThrow();
    String token = jwtService.getToken(user);
    return  AuthResponse.builder()
      .token(token)
      .build();
  }

  @Override
  public AuthResponse register(RegisterRequest request) {
    User user = User.builder()
      .usrUsername(request.getUsrUsername())
      .usrPassword(passwordEncoder.encode(request.getUsrPassword()))
      .usrEmail(request.getUsrEmail())
      .usrNombres(request.getUsrNombres())
      .usrApellidos(request.getUsrApellidos())
      .usrTelefono(request.getUsrTelefono())
      .usrDireccion(request.getUsrDireccion())
      .usrIdentificacion(request.getUsrIdentificacion())
      .role(request.getRole())
      .usrActive(User.Status.activo)
      .usrFechaInicio(Date.from(Instant.now()))
      .build();

    userService.addUser(user);
    return AuthResponse.builder()
      .token(jwtService.getToken(user))
      .build();
  }
}
