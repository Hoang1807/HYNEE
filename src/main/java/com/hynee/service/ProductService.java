package com.hynee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hynee.entity.Product;
import com.hynee.repository.ProductDAO;
@Service
public class ProductService {
	private final ProductDAO productDAO;

	@Autowired
	public ProductService(ProductDAO productDAO) {
		this.productDAO = productDAO;
	}
	
	public Product addProduct(Product product) {
		return this.productDAO.save(product);
	}

	public Product updateProduct(Product product) {
		return this.productDAO.save(product);
	}

	public List<Product> findAllProduct() {
		return this.productDAO.findAll();
	}

	public Product findById(String id) {
//		return userDAO.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
		return this.productDAO.findById(id).orElse(null);
	}

	public void deleteProduct(String id) {
		this.productDAO.deleteById(id);
	}
}
