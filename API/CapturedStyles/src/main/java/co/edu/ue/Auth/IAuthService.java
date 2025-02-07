package co.edu.ue.Auth;

import co.edu.ue.dto.LoginRequest;
import co.edu.ue.dto.RegisterRequest;

public interface IAuthService {

  public AuthResponse login(LoginRequest request);
  public AuthResponse register(RegisterRequest request);
}
