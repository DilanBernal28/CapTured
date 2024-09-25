package co.edu.ue.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import co.edu.ue.model.Coupon;

public interface ICouponJpa extends JpaRepository<Coupon, Integer> {

}
