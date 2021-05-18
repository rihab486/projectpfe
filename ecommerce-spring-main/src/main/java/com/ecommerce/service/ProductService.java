package com.ecommerce.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.modal.Product;

public interface ProductService {
	
	Product addProductToCategory(Product product,long id  );
	
	Product editProduct(Product product, long id);
	
	Product findProductById(long id);
	
	void deleteProduct(long id);
	
	List<Product> findAllProducts();
	
	List<Product> findProductsForCategory(long idCategory);
	

	Product getProduct(Long id);

}
