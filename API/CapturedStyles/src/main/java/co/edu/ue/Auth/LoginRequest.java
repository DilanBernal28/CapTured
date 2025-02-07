package co.edu.ue.Auth;

import lombok.Builder;

@Builder
public record LoginRequest(String username, String password) {}
