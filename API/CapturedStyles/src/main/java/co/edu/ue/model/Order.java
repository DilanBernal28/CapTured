package co.edu.ue.model;

import java.io.Serializable;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;



/**
 * The persistent class for the orders database table.
 * 
 */
@Entity
@Table(name="orders")
@NamedQuery(name="Order.findAll", query="SELECT o FROM Order o")
public class Order implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ord_id")
	private int ordId;

	@Column(name="id_user")
	private int idUser;

	@Column(name="ord_fechaPedido")
	private Date ordFechaPedido;

	@Column(name="ord_precio")
	private double ordPrecio;

	@Enumerated(EnumType.STRING)
	@Column(name="ord_status")
	private Status ordStatus;

	//bi-directional many-to-one association to Orderdetail
	@OneToMany(mappedBy="order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
	private List<Orderdetail> orderdetails;

	public Order() {
	}

	public int getOrdId() {
		return this.ordId;
	}

	public void setOrdId(int ordId) {
		this.ordId = ordId;
	}

	public int getIdUser() {
		return this.idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public Date getOrdFechaPedido() {
		return ordFechaPedido;
	}

	public void setOrdFechaPedido(Date ordFechaPedido) {
		this.ordFechaPedido = ordFechaPedido;
	}

	public double getOrdPrecio() {
		return this.ordPrecio;
	}

	public void setOrdPrecio(double ordPrecio) {
		this.ordPrecio = ordPrecio;
	}

	public Status getOrdStatus() {
		return this.ordStatus;
	}

	public void setOrdStatus(Status ordStatus) {
		this.ordStatus = ordStatus;
	}

	public List<Orderdetail> getOrderdetails() {
		return this.orderdetails;
	}

	public void setOrderdetails(List<Orderdetail> orderdetails) {
		this.orderdetails = orderdetails;
	}

	public Orderdetail addOrderdetail(Orderdetail orderdetail) {
		getOrderdetails().add(orderdetail);
		orderdetail.setOrder(this);

		return orderdetail;
	}

	public Orderdetail removeOrderdetail(Orderdetail orderdetail) {
		getOrderdetails().remove(orderdetail);
		orderdetail.setOrder(null);

		return orderdetail;
	}
	public enum Status {
		desatendido,
		entregado,
		cancelado,
		despachado,
		alistamiento
	}

}