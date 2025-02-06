package co.edu.ue.model;

import java.io.Serializable;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;


/**
 * The persistent class for the orders database table.
 *
 */
@Entity
@Data
@Table(name="Orders")
@NamedQuery(name="Order.findAll", query="SELECT o FROM Order o")
public class Order implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ord_id", nullable=false)
	private int ordId;


	@Column(name="ord_fechaPedido", nullable = false)
	private Date ordFechaPedido;

	@Column(name="ord_precio", nullable = false)
	private double ordPrecio;

	@Enumerated(EnumType.STRING)
	@Column(name="ord_status", nullable=false)
	private Status ordStatus;


  @Column(name="id_user", nullable=false)
  private int idUser;

	@OneToMany(mappedBy="order", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
	private List<Orderdetail> orderdetails;

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
