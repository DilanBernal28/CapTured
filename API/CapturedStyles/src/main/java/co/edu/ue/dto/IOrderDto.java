package co.edu.ue.dto;

import co.edu.ue.model.Order.Status;

import java.util.Date;

public interface IOrderDto {
  int getId();
  int getUserId();
  Date getOrderDate();
  double getTotalPrice();
  Status getStatus();
}
