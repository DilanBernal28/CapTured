package co.edu.ue.controller;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import co.edu.ue.model.Product;
import co.edu.ue.model.Product.Status;
import co.edu.ue.service.IProductService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "prd")
public class ProductController {

	IProductService service;

  public ProductController(IProductService service) {
    this.service = service;
  }

	@GetMapping("product")
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> datos = service.allProducts();
		if(datos!=null) {
			HttpHeaders headers = new HttpHeaders();
			headers.add("cantidad_datos", String.valueOf(datos.size()));
			return new ResponseEntity<>(datos,headers,HttpStatus.OK);
		}return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping(value = "product/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable("id") int id){
		if(service.getById(id) ==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}else return new ResponseEntity<>(service.getById(id),HttpStatus.ACCEPTED);
	}


	@GetMapping(value = "product/category/{cat}")
	public ResponseEntity<List<Product>> getProductByCategory(@PathVariable("cat") String category){
		List<Product> datos = service.getByCategory(category);
		if(datos !=null) {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Data amount", String.valueOf(datos.size()));
			return new ResponseEntity<>(service.getByCategory(category), headers,HttpStatus.ACCEPTED);
		} else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping(value = "product/name/{nm}")
	public ResponseEntity<Product> getProdByName(@PathVariable("nm") String name){
		Product product = service.getByName(name);
		if(service.getByName(name) == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}else return new ResponseEntity<>(product,HttpStatus.ACCEPTED);
	}

	@GetMapping(value = "product/name/all/{nm}" )
	public ResponseEntity<List<Product>> getProdsByName(@PathVariable("nm") String name){

		List<Product>datos = service.getAllByName(name);
		HttpHeaders headers = new HttpHeaders();
		headers.add("cantidad_datos", String.valueOf(datos.size()));
		 if(service.getAllByName(name) == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		 }else return new ResponseEntity<>(datos, headers,HttpStatus.ACCEPTED);
	}

	 @GetMapping(value = "product/status/{status}")
	 public ResponseEntity<List<Product>> getProdsByStatus(@PathVariable("status") Status status){
		 List<Product> product = service.getAllByStatus(status);
		 try {
			return new ResponseEntity<>(product,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	 }

		//Peticiones Post

	 //Crea un producto
	@PostMapping(value="product", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> crateProduct(@RequestBody Product product) {
		if(!service.existsByName(product.getProdName())) {
			service.newProduct(product);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}else return new ResponseEntity<>(HttpStatus.FOUND);
	}

  @PostMapping(value = "products", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Void> createProducts(@RequestBody List<Product> products) {
    HttpHeaders headers = new HttpHeaders();
    List<Product> wrongProducts = new ArrayList<>();
    List<Product> newProducts = new ArrayList<>();
    List<Product> existingProducts = new ArrayList<>();
    int cantProductsWrong = 0 ;
    int cantProductsExisting = 0 ;
    int cantProductsCorrect = 0 ;

    for(Product product : products) {
      if(!service.existsByName(product.getProdName())) {
        try {
          service.newProduct(product);
          cantProductsCorrect++;
          newProducts.add(product);
        } catch (RuntimeException e) {
          cantProductsWrong++;
          wrongProducts.add(product);
        }
      }else {
        existingProducts.add(product);
        cantProductsExisting++;
      }
    }

    if (cantProductsWrong == 0 && cantProductsExisting == 0) {
      headers.add("Message","Successfully created: " + newProducts + " products");
      headers.add("Number of wrong products", String.valueOf(cantProductsCorrect));
      return new ResponseEntity<>(headers, HttpStatus.CREATED);
    } else if (cantProductsWrong > 0 && cantProductsCorrect == 0 && cantProductsExisting == 0) {
      headers.add("Message","Error in the petition");
      headers.add("Amount of products wrong", String.valueOf(cantProductsWrong));
      headers.add("Products wrong", String.valueOf(cantProductsWrong));
      return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
    } else if (cantProductsWrong > 0 && cantProductsExisting > 0 && cantProductsCorrect > 0) {
      headers.add("Message","Successfully created: " + cantProductsCorrect + " products");
      headers.add("Amount of products correct", String.valueOf(cantProductsCorrect));
      headers.add("Amount of products existing", String.valueOf(cantProductsExisting));
      headers.add("Products wrong", String.valueOf(wrongProducts));
      headers.add("Products existing", String.valueOf(existingProducts));
      return new ResponseEntity<>(headers, HttpStatus.CONFLICT);
    } else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

	@PutMapping(value = "product/edit/{nm}")
	public ResponseEntity<Product> updateProduct(@PathVariable("nm") String name, @RequestBody Product newUpdatedProduct){
		if(service.existsByName(name)) {
			Product product = service.updateProduct(name, newUpdatedProduct);
			return new ResponseEntity<>(product,HttpStatus.CREATED);
		}return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PutMapping(value = "product/status/{status}")
	public ResponseEntity<Product> statusProduct(@PathVariable("status") String nm, @RequestBody Product newStatusProduct){
		if(service.existsByName(newStatusProduct.getProdName())) {
			Product product = service.vigentProduct(nm, newStatusProduct);
			return new ResponseEntity<>(product,HttpStatus.NO_CONTENT);
		}else return new ResponseEntity<>(HttpStatus.CONFLICT);
	}

	@DeleteMapping(value = "product/delete/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable("id") int id){
		if(service.existById(id)) {
			service.deleteProduct(id);
		} else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		return ResponseEntity.noContent().build();
	}

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor: " + ex.getMessage());
    }

}
