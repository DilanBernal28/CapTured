package co.edu.ue.Auth;

import co.edu.ue.dao.IUserJpa;
import co.edu.ue.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import co.edu.ue.model.User;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService{

  private final IUserJpa repositoryService;

  private final IUserService userService;

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
      .build();

    try{
      userService.addUser(user);
      repositoryService.save(user);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }


    return AuthResponse.builder()
      .token(null)
      .build();
  }
}
