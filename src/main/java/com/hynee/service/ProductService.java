package com.hynee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	public Page<Product> findPage(Pageable pageable) {
		return this.productDAO.findAll(pageable);
	}

	public Product findById(String id) {
//		return userDAO.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
		return this.productDAO.findById(id).orElse(null);
	}

	public void deleteProduct(String id) {
		this.productDAO.deleteById(id);
	}

	public boolean findByCodeAndColor(String productCode, String productColor) {
		return this.productDAO.existsByProductCodeContainingAndProductColorContaining(productCode, productColor);
	}

	public Page<Product> findByProductPriceBetween(int minPrice, int maxPrice, Pageable pageable) {
		return productDAO.findByProductPriceBetween(minPrice, maxPrice, pageable);
	}

	public Page<Product> findByProductSize(String productSize, Pageable pageable) {
		return productDAO.findByProductSize(productSize, pageable);
	}

	public Page<Product> findByProductPriceGreaterThan(int price, Pageable pageable) {
		return productDAO.findByProductPriceGreaterThanEqual(price, pageable);
	}

	public Page<Product> findByProductSizeAndProductPriceBetween(String productSize, int minPrice, int maxPrice,
			Pageable pageable) {
		return productDAO.findByProductSizeAndProductPriceBetween(productSize, minPrice, maxPrice, pageable);
	}

	public Page<Product> findByProductSizeAndProductPriceGreaterThan(String productSize, int price, Pageable pageable) {
		return productDAO.findByProductSizeAndProductPriceGreaterThanEqual(productSize, price, pageable);
	}

	public Page<Product> findByProductNameContaining(String productName, Pageable pageable) {
		return productDAO.findByProductNameContaining(productName, pageable);
	}

	public Page<Product> findByDetailsDetailValueContaining(String detailValue, Pageable pageable) {
		return productDAO.findByDetailsDetailValueContaining(detailValue, pageable);
	}

	public Page<Product> findByProductSizeAndProductPriceBetweenAndDetailsDetailValueContaining(String productSize,
			Integer priceFrom, Integer priceTo, String detailValue, Pageable pageable) {
		return productDAO.findByProductSizeAndProductPriceBetweenAndDetailsDetailValueContaining(productSize, priceFrom,
				priceTo, detailValue, pageable);
	}

	public Page<Product> findByProductSizeAndProductPriceGreaterThanAndDetailsDetailValueContaining(String productSize,
			Integer priceGreaterThan, String detailValue, Pageable pageable) {
		return productDAO.findByProductSizeAndProductPriceGreaterThanAndDetailsDetailValueContaining(productSize,
				priceGreaterThan, detailValue, pageable);
	}

	public Page<Product> findByProductSizeAndDetailsDetailValueContaining(String productSize, String detailValue,
			Pageable pageable) {
		return productDAO.findByProductSizeAndDetailsDetailValueContaining(productSize, detailValue, pageable);
	}

	public Page<Product> findByProductPriceBetweenAndDetailsDetailValueContaining(Integer priceFrom, Integer priceTo,
			String detailValue, Pageable pageable) {
		return productDAO.findByProductPriceBetweenAndDetailsDetailValueContaining(priceFrom, priceTo, detailValue,
				pageable);
	}

	public Page<Product> findByProductPriceGreaterThanAndDetailsDetailValueContaining(Integer priceGreaterThan,
			String detailValue, Pageable pageable) {
		return productDAO.findByProductPriceGreaterThanAndDetailsDetailValueContaining(priceGreaterThan, detailValue,
				pageable);
	}

}
