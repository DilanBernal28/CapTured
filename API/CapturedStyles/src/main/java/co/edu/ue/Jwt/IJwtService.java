package co.edu.ue.Jwt;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface IJwtService {
  public String getToken(UserDetails user);

}
