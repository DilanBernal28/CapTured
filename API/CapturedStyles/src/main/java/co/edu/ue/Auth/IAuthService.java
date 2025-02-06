package co.edu.ue.Auth;

public interface IAuthService {

  public AuthResponse login(LoginRequest request);
  public AuthResponse register(RegisterRequest request);
}
