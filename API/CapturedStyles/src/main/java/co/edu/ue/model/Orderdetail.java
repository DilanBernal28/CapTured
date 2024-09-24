package co.edu.ue.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name="orderdetails")
@NamedQuery(name="Orderdetail.findAll", query="SELECT o FROM Orderdetail o")
public class Orderdetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name="ordp_cantidad")
	private int ordpCantidad;

	//bi-directional many-to-one association to Order
	@Id
	@ManyToOne
	@JoinColumn(name="ord_id")
	@JsonBackReference
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
	
	public void setProductById(int productId) {
		this.product = new Product();
		this.product.setIdProducto(productId);
	}

}