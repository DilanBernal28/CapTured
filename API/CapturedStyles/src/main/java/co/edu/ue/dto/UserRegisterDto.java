package co.edu.ue.dto;

import co.edu.ue.model.User;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link co.edu.ue.model.User}
 */
@Value
public class UserRegisterDto implements Serializable {
  User.Status usrActive;
  String usrApellidos;
  String usrDireccion;
  String usrEmail;
  String usrIdentificacion;
  String usrNombres;
  String usrPassword;
  String usrTelefono;
  String usrUsername;
}
