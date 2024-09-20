package co.edu.ue.model;

import java.io.Serializable;
import java.sql.Timestamp;

import jakarta.persistence.*;




/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_user")
	private int idUser;

	@Enumerated(EnumType.STRING)
	@Column(name="usr_active")
	private Status usrActive;

	@Column(name="usr_apellidos")
	private String usrApellidos;

	@Column(name="usr_direccion")
	private String usrDireccion;
	
	@Column(name="usr_email")
	private String usrEmail;

	@Column(name="usr_fechaInicio")
	private Timestamp usrFechaInicio;

	@Column(name="usr_identificacion")
	private String usrIdentificacion;

	@Column(name="usr_nombres")
	private String usrNombres;

	@Column(name="usr_password")
	private String usrPassword;

	@Column(name="usr_telefono")
	private String usrTelefono;

	@Column(name="usr_username")
	private String usrUsername;


	public User() {
	}

	public int getIdUser() {
		return this.idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public Status getUsrActive() {
		return usrActive;
	}

	public void setUsrActive(Status usrActive) {
		this.usrActive = usrActive;
	}

	public String getUsrApellidos() {
		return this.usrApellidos;
	}

	public void setUsrApellidos(String usrApellidos) {
		this.usrApellidos = usrApellidos;
	}

	public String getUsrDireccion() {
		return this.usrDireccion;
	}

	public void setUsrDireccion(String usrDireccion) {
		this.usrDireccion = usrDireccion;
	}
	
	public String getUsrEmail() {
		return usrEmail;
	}

	public void setUsrEmail(String usrEmail) {
		this.usrEmail = usrEmail;
	}

	public Timestamp getUsrFechaInicio() {
		return usrFechaInicio;
	}

	public void setUsrFechaInicio(Timestamp usrFechaInicio) {
		this.usrFechaInicio = usrFechaInicio;
	}

	public String getUsrIdentificacion() {
		return this.usrIdentificacion;
	}

	public void setUsrIdentificacion(String usrIdentificacion) {
		this.usrIdentificacion = usrIdentificacion;
	}

	public String getUsrNombres() {
		return this.usrNombres;
	}

	public void setUsrNombres(String usrNombres) {
		this.usrNombres = usrNombres;
	}

	public String getUsrPassword() {
		return this.usrPassword;
	}

	public void setUsrPassword(String usrPassword) {
		this.usrPassword = usrPassword;
	}

	public String getUsrTelefono() {
		return this.usrTelefono;
	}

	public void setUsrTelefono(String usrTelefono) {
		this.usrTelefono = usrTelefono;
	}

	public String getUsrUsername() {
		return this.usrUsername;
	}

	public void setUsrUsername(String usrUsername) {
		this.usrUsername = usrUsername;
	}
	
	public enum Status {
		activo,
		suspendido,
		baneado
	}
}