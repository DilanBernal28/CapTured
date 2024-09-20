package co.edu.ue;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


@EnableWebSecurity
@Configuration
public class SecurityConfig {
	@Bean
	public InMemoryUserDetailsManager userManager() {
		List<UserDetails> users = List.of(
				User
				.withUsername("userWeb")
				.password("{noop}1234")
				.roles("ADMIN")
				.build(),
				User
				.withUsername("userPage")
				.password("{noop}1234")
				.roles("PAGE")
				.build());
		return new InMemoryUserDetailsManager(users);
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(cus -> cus.disable())
		.authorizeHttpRequests(aut->
			aut.requestMatchers(HttpMethod.POST,"/usr/user").hasAnyRole("ADMIN","PAGE")
			.requestMatchers(HttpMethod.GET,"/usr/user/*").hasAnyRole("ADMIN","PAGE")
			.requestMatchers(HttpMethod.GET,"/usr/user/nm/*").hasAnyRole("ADMIN","PAGE")
			.requestMatchers(HttpMethod.GET,"/usr/user/status/*").hasAnyRole("ADMIN","PAGE")
			.requestMatchers(HttpMethod.GET,"/usr").hasAnyRole("ADMIN","PAGE")
			.requestMatchers(HttpMethod.PUT,"/usr/user/*").hasAnyRole("ADMIN","PAGE")
			.requestMatchers(HttpMethod.PUT,"/usr/user/active/*").hasAnyRole("ADMIN","PAGE")
			.requestMatchers(HttpMethod.PUT,"/usr/user/password/*").hasAnyRole("ADMIN","PAGE")
			.requestMatchers(HttpMethod.DELETE,"usr/user/delete/*").hasAnyRole("ADMIN")
			)
		.httpBasic(Customizer.withDefaults());
		return http.build();
		
	}

}
