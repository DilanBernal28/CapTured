package co.edu.ue.Jwt;

import org.springframework.security.core.userdetails.UserDetails;

public interface IJwtService {
  public String getToken(UserDetails user);
  public String getUsernameFromToken(String token);
  boolean isTokenValid(String token, UserDetails userDetails);
}
