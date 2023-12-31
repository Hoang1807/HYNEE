package com.hynee.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.Product;

public interface ProductDAO extends JpaRepository<Product, String> {
	public boolean existsByProductCodeContainingAndProductColorContaining(String productCode, String productColor);

	Page<Product> findByProductPriceBetween(int minPrice, int maxPrice, Pageable pageable);

	Page<Product> findByProductSize(String productSize, Pageable pageable);

	Page<Product> findByProductPriceGreaterThanEqual(int price, Pageable pageable);

	Page<Product> findByProductSizeAndProductPriceBetween(String productSize, int minPrice, int maxPrice,
			Pageable pageable);

	Page<Product> findByProductSizeAndProductPriceGreaterThanEqual(String productSize, int price, Pageable pageable);

	Page<Product> findByProductNameContaining(String productName, Pageable pageable);

	Page<Product> findByDetailsDetailValueContaining(String detailValue, Pageable pageable);

	Page<Product> findByProductSizeAndProductPriceBetweenAndDetailsDetailValueContaining(String productSize,
			Integer priceFrom, Integer priceTo, String detailValue, Pageable pageable);

	Page<Product> findByProductSizeAndProductPriceBetween(String productSize, Integer priceFrom, Integer priceTo,
			Pageable pageable);

	Page<Product> findByProductSizeAndProductPriceGreaterThanAndDetailsDetailValueContaining(String productSize,
			Integer priceGreaterThan, String detailValue, Pageable pageable);

	Page<Product> findByProductSizeAndDetailsDetailValueContaining(String productSize, String detailValue,
			Pageable pageable);

	Page<Product> findByProductPriceBetweenAndDetailsDetailValueContaining(Integer priceFrom, Integer priceTo,
			String detailValue, Pageable pageable);

	Page<Product> findByProductPriceGreaterThanAndDetailsDetailValueContaining(Integer priceGreaterThan,
			String detailValue, Pageable pageable);
}
