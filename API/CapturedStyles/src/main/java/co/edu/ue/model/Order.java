package co.edu.ue.model;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.*;


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
	@Column(name="ord_id")
	private int ordId;

	@Column(name="id_user")
	private int idUser;

	@Column(name="ord_fechaPedido")
	private Timestamp ordFechaPedido;

	@Column(name="ord_precio")
	private double ordPrecio;

	//bi-directional many-to-one association to Orderdetail
	@OneToMany(mappedBy="order")
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

	public Timestamp getOrdFechaPedido() {
		return ordFechaPedido;
	}

	public void setOrdFechaPedido(Timestamp ordFechaPedido) {
		this.ordFechaPedido = ordFechaPedido;
	}

	public double getOrdPrecio() {
		return this.ordPrecio;
	}

	public void setOrdPrecio(double ordPrecio) {
		this.ordPrecio = ordPrecio;
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

}