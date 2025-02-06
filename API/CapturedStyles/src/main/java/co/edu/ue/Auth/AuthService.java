package co.edu.ue.Auth;

import co.edu.ue.Jwt.JwtService;
import co.edu.ue.dao.IUserJpa;
import co.edu.ue.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import co.edu.ue.model.User;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService{

  private final IUserJpa repositoryService;

  private final IUserService userService;
  private final JwtService jwtService;

  @Override
  public AuthResponse login(LoginRequest request) {
    return null;
  }

  @Override
  public AuthResponse register(RegisterRequest request) {
    User user = User.builder()
      .usrUsername(request.getUsrUsername())
      .usrPassword(request.getUsrPassword())
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
//    try{
//      repositoryService.save(user);
//    } catch (Exception e) {
//      throw new RuntimeException(e);
//    }

    try{
      AuthResponse authResponse = AuthResponse.builder()
        .token(jwtService.getToken(user))
        .build();
      return authResponse;
    }catch(Exception e){
      return AuthResponse.builder()
        .token("malio sal")
        .build();
    }

//    return AuthResponse.builder()
//      .token(jwtService.getToken(user))
//      .build();
  }
}
