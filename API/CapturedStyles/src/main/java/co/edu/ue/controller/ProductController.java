package co.edu.ue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.ue.model.Product;
import co.edu.ue.model.Product.Status;
import co.edu.ue.service.IProductService;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "prd")
public class ProductController {
	
	@Autowired
	IProductService service;
	
		//Peticiones GEt
	
	@GetMapping(value = "product/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable int id){
		return new ResponseEntity<Product>(service.getById(id),HttpStatus.ACCEPTED);
	}
	
	@GetMapping(value = "product/category/{cat}")
	public ResponseEntity<List<Product>> getProductByCategory(@PathVariable String category){
		return new ResponseEntity<List<Product>>(service.getByCategory(category),HttpStatus.ACCEPTED);
	}
	
	@GetMapping(value = "product/name/{name}")
	public ResponseEntity<Product> getProdByName(@PathVariable String name){
		return new ResponseEntity<Product>(HttpStatus.ACCEPTED);
	}
	
	 @GetMapping(value = "product/name/all/{}" )
	public ResponseEntity<Product> getProdsByName(@PathVariable String name){
		return new ResponseEntity<Product>(HttpStatus.ACCEPTED);
	}
	 
	 @GetMapping(value = "product/status/{}")
	 public ResponseEntity<Product> getProdsByStatus(@PathVariable String name){
		 return new ResponseEntity<Product>(HttpStatus.ACCEPTED);
	 }
	
		//Peticiones Post
	
	@PostMapping(value="product", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> getMethodName(@RequestParam String param) {
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
	
	
		//Peticiones Put
	
	@PutMapping(value = "product/edit/{name}")
	public ResponseEntity<Product> updateProduct(){
		return new ResponseEntity<Product>(HttpStatus.CREATED);
	}
	
	@PutMapping(value = "product/status/{name}")
	public ResponseEntity<Product> statusProduct(){
		return new ResponseEntity<Product>(HttpStatus.CREATED);
	}
	
		//Peticion Delete
	
	@DeleteMapping(value = "product/delete/{id}")
	public ResponseEntity<Void> deleteProduct(){
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	//Te falta hacer el resto en el service, validaciones y ya

}
