package co.edu.ue.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) {
    return http
      .csrf(csrf ->
        csrf
          .disable())
      .authorizeHttpRequests(authRequests ->
          authRequests
            .requestMatchers("/auth/**").permitAll()
            .anyRequest().authenticated()
          )
      .formLogin(withDefaults())
      .build();
  }

}
