package co.edu.ue.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="orderdetails")
@NamedQuery(name="Orderdetail.findAll", query="SELECT o FROM Orderdetail o")
public class Orderdetail implements Serializable {
	private static final long serialVersionUID = 1L;

  @Id
  @Column(name = "ordp_id", nullable = false)
  private int ordpId;

	@Column(name="ordp_cantidad", nullable=false)
	private int ordpCantidad;

	//bi-directional many-to-one association to Order
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="ord_id", nullable=false)
	@JsonBackReference
	private Order order;

	//bi-directional many-to-one association to Product
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="id_producto", nullable=false)
	private Product product;
}
