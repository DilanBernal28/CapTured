package co.edu.ue.service;

import java.util.List;

import co.edu.ue.model.Product;
import co.edu.ue.model.User.Status;

public interface IProductService {
	
	Product newProduct(Product product);
	Product getById(int id);
	Product getByName(String name);
	List <Product> getAllByName(String name);
	List<Product> getByCategory(String category);
	List<Product> getAllByStatus(Status status);
	boolean existsByName(String name);
	Product updateProduct(String name, Product product);
	Product vigentProduct(String name, Product product);
	void deleteProduct(int id);	

}
