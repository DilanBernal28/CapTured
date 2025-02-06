package co.edu.ue.Auth;

import co.edu.ue.Jwt.JwtService;
import co.edu.ue.service.IUserService;
import lombok.RequiredArgsConstructor;
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

  @Override
  public AuthResponse login(LoginRequest request) {
    return null;
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
