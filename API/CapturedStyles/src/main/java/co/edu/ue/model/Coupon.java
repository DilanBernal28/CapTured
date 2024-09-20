package co.edu.ue.model;

import java.io.Serializable;
import jakarta.persistence.*;


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

	@Column(name="cup_discount")
	private float cupDiscount;

	@Column(name="cup_valid")
	private byte cupValid;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="id_user")
	private User user;

	public Coupon() {
	}

	public int getCupId() {
		return this.cupId;
	}

	public void setCupId(int cupId) {
		this.cupId = cupId;
	}

	public float getCupDiscount() {
		return this.cupDiscount;
	}

	public void setCupDiscount(float cupDiscount) {
		this.cupDiscount = cupDiscount;
	}

	public byte getCupValid() {
		return this.cupValid;
	}

	public void setCupValid(byte cupValid) {
		this.cupValid = cupValid;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}