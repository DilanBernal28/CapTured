package co.edu.ue.Jwt;

import java.security.Key;
import java.util.Date;
import java.util.Map;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.util.HashMap;

@Service
public class JwtService implements IJwtService {

  private static final String SECRET_KEY = "Belateamomuchisimodemasiadonosabescuanto050719";

  @Override
  public String getToken(UserDetails user) {
    return getToken(new HashMap<>(), user);
  }

  private String getToken(Map<String, Object> extraClaims, UserDetails user) {
    String token = Jwts.builder()
      .setClaims(extraClaims)
      .setSubject(user.getUsername())
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis() + 1000*60*24))
      .signWith(SignatureAlgorithm.HS256, getKey())
      .compact();
    return token;
  }

  private Key getKey() {
    byte[] keyByte = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyByte);
  }
}
