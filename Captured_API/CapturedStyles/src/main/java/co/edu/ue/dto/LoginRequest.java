package co.edu.ue.dto;

import lombok.Builder;

@Builder
public record LoginRequest(String username, String password) {}
