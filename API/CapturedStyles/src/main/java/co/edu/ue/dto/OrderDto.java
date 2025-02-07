package co.edu.ue.dto;

import java.util.Date;
import java.util.List;

import co.edu.ue.model.Order.Status;
import co.edu.ue.model.Orderdetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto implements IOrderDto {
  private int id;
  private int userId;
  private Status status;
  private Date orderDate;
  private double totalPrice;
  private List<Orderdetail> details;


}
