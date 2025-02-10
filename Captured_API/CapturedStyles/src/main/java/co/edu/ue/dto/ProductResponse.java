package co.edu.ue.dto;

import co.edu.ue.model.Product.Status;

public record ProductResponse(
  String name,
  String imgHtml,
  Status status,
  double price,
  String category

) {
}
