package co.edu.ue.model;

import java.io.Serializable;


import jakarta.persistence.*;
import lombok.Builder;


/**
 * The persistent class for the coupons database table.
 * 
 */
@Entity
@Table(name="coupons")
@Builder
@NamedQuery(name="Coupon.findAll", query="SELECT c FROM Coupon c")
public class Coupon implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cup_id")
	private int cupId;

	@Column(name="cup_discount")
	private float cupDiscount;

	@Column(name="cup_fire")
	private int cupFire;

	@Enumerated(EnumType.STRING)
	@Column(name="cup_valid")
	private Valid cupValid;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="id_user")
	private User user;
	
	
	
	public int getCupId() {
		return cupId;
	}



	public void setCupId(int cupId) {
		this.cupId = cupId;
	}



	public float getCupDiscount() {
		return cupDiscount;
	}



	public void setCupDiscount(float cupDiscount) {
		this.cupDiscount = cupDiscount;
	}



	public Valid getCupValid() {
		return cupValid;
	}



	public void setCupValid(Valid cupValid) {
		this.cupValid = cupValid;
	}



	
	public User getUser() {
		return user;
	}



	public void setUser(User user) {
		this.user = user;
	}



	public enum Valid{
		si,
		no
	}



	public int getCupFire() {
		return cupFire;
	}



	public void setCupFire(int cupFire) {
		this.cupFire = cupFire;
	}
}