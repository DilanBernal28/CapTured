package co.edu.ue.model;

import java.io.Serializable;

import jakarta.persistence.*;


/**
 * The persistent class for the orderdetails database table.
 * 
 */
@Entity
@Table(name="orderdetails")
@NamedQuery(name="Orderdetail.findAll", query="SELECT o FROM Orderdetail o")
public class Orderdetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name="ordp_cantidad")
	private int ordpCantidad;

	//bi-directional many-to-one association to Order
	@ManyToOne
	@Id
	@JoinColumn(name="ord_id")
	private Order order;

	//bi-directional many-to-one association to Product
	@ManyToOne
	@JoinColumn(name="id_producto")
	private Product product;

	public Orderdetail() {
	}

	public int getOrdpCantidad() {
		return this.ordpCantidad;
	}

	public void setOrdpCantidad(int ordpCantidad) {
		this.ordpCantidad = ordpCantidad;
	}

	public Order getOrder() {
		return this.order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Product getProduct() {
		return this.product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

}