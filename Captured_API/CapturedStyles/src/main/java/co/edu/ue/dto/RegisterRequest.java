package co.edu.ue.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record RegisterRequest(
  @NotNull(message = "The Username can't be Empty")
  @Pattern(regexp = "^(?=.*[A-Za-zñÑ0-9áéíóúÁÉÍÓÚ_.-]).{4,40}$",
    message = "The username need to have min 4 and max 15 characters, without spaces and special characters don't allowed.")
  String username,
  @NotNull(message = "The Password can't be Empty")
  @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-zñÑ])(?=.*\\d)(?=.*[@#$%^&+=!:<>;*]).{8,20}$",
           message = "The password need to have min 8 characters, a Uppercase, a Lowercase and a character.")
  String password,
  @NotNull(message = "The first name can't be Empty.")
  @Pattern(regexp = "^(?=.*[A-Za-zñÑ0-9áéíóúÁÉÍÓÚ]).{3,}$",
           message = "The first name need to have min 4 and max 15 characters, without spaces and special characters don't allowed.")
  String names,
  @NotNull(message = "The lastName can't be Empty.")
  @Pattern(regexp = "^(?=.*[A-Za-zñÑ0-9áéíóúÁÉÍÓÚ]).{3,}",
           message = "The last name need to have min 4 characters, without spaces and special characters don't allowed.")
  String lastname,
  @NotNull(message = "The email can't be Empty.")
  @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
  String email,
  @NotNull(message = "The phone can't be Empty.")
  @Pattern(regexp = "^(?=.*\\d).{8,}$",
           message = "The phone only can have numbers.")
  String phone,
  @NotNull(message = "The document can't be Empty")
  @Pattern(regexp = "(?=.*\\d).{7,}$",
           message = "The document need to have a number.")
  String document,
  String address
) {}
