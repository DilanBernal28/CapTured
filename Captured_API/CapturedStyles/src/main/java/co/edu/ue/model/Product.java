package co.edu.ue.model;

import java.io.Serializable;

import jakarta.persistence.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * The persistent class for the product database table.
 *
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@NamedQuery(name="Product.findAll", query="SELECT p FROM Product p")
public class Product implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id_producto", nullable = false)
	private int idProducto;

	@Enumerated(EnumType.STRING)
	@Setter
	@Column(name = "prod_active", nullable = false)
	private Status prodActive;

	@Setter
	@Column(name = "prod_category", nullable = false)
	private String prodCategory;

	@Setter
	@Column(name = "prod_idHTML", nullable = false)
	private String prodIdHTML;

	@Setter
	@Column(name = "prod_img", nullable = false)
	private String prodImg;

	@Setter
	@Column(name="prod_name", nullable = false)
	private String prodName;

	@Setter
	@Column(name="prod_precio", nullable = false)
	private double prodPrecio;

	//bi-directional many-to-one association to Orderdetail
	@JsonIgnore
	@OneToMany(mappedBy="product")
	private List<Orderdetail> orderdetails;

	public Orderdetail addOrderdetail(Orderdetail orderdetail) {
		getOrderdetails().add(orderdetail);
		orderdetail.setProduct(this);

		return orderdetail;
	}

	public Orderdetail removeOrderdetail(Orderdetail orderdetail) {
		getOrderdetails().remove(orderdetail);
		orderdetail.setProduct(null);

		return orderdetail;
	}
	public enum Status {
		activo,
		baja,
		agotado
	}

}
