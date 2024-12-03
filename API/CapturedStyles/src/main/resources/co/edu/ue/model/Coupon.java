package co.edu.ue.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the coupons database table.
 * 
 */
@Entity
@Table(name="coupons")
@NamedQuery(name="Coupon.findAll", query="SELECT c FROM Coupon c")
public class Coupon implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cup_id")
	private int cupId;

	@Column(name="cu_valid")
	private byte cuValid;

	@Column(name="cup_discount")
	private float cupDiscount;

	@Column(name="id_user")
	private int idUser;

	public Coupon() {
	}

	public int getCupId() {
		return this.cupId;
	}

	public void setCupId(int cupId) {
		this.cupId = cupId;
	}

	public byte getCuValid() {
		return this.cuValid;
	}

	public void setCuValid(byte cuValid) {
		this.cuValid = cuValid;
	}

	public float getCupDiscount() {
		return this.cupDiscount;
	}

	public void setCupDiscount(float cupDiscount) {
		this.cupDiscount = cupDiscount;
	}

	public int getIdUser() {
		return this.idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

}