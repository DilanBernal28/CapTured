package co.edu.ue.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.*;


/**
 * The persistent class for the product database table.
 * 
 */
@Entity
@NamedQuery(name="Product.findAll", query="SELECT p FROM Product p")
public class Product implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_producto")
	private int idProducto;

	@Enumerated(EnumType.STRING)
	@Column(name="prod_active")
	private Status prodActive;

	@Column(name="prod_category")
	private String prodCategory;

	@Column(name="prod_idHTML")
	private String prodIdHTML;

	@Column(name="prod_img")
	private String prodImg;

	@Column(name="prod_name")
	private String prodName;

	@Column(name="prod_precio")
	private double prodPrecio;

	//bi-directional many-to-one association to Orderdetail
	@OneToMany(mappedBy="product")
	private List<Orderdetail> orderdetails;

	public Product() {
	}

	public int getIdProducto() {
		return this.idProducto;
	}

	public void setIdProducto(int idProducto) {
		this.idProducto = idProducto;
	}

	public Status getProdActive() {
		return this.prodActive;
	}

	public void setProdActive(Status prodActive) {
		this.prodActive = prodActive;
	}

	public String getProdCategory() {
		return this.prodCategory;
	}

	public void setProdCategory(String prodCategory) {
		this.prodCategory = prodCategory;
	}

	public String getProdIdHTML() {
		return prodIdHTML;
	}

	public void setProdIdHTML(String prodIdHTML) {
		this.prodIdHTML = prodIdHTML;
	}

	public String getProdImg() {
		return this.prodImg;
	}

	public void setProdImg(String prodImg) {
		this.prodImg = prodImg;
	}

	public String getProdName() {
		return this.prodName;
	}

	public void setProdName(String prodName) {
		this.prodName = prodName;
	}

	public double getProdPrecio() {
		return this.prodPrecio;
	}

	public void setProdPrecio(double prodPrecio) {
		this.prodPrecio = prodPrecio;
	}

	public List<Orderdetail> getOrderdetails() {
		return this.orderdetails;
	}

	public void setOrderdetails(List<Orderdetail> orderdetails) {
		this.orderdetails = orderdetails;
	}

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