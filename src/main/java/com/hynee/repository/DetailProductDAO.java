package com.hynee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.DetailProduct;
import com.hynee.entity.DetailProductId;
import com.hynee.entity.Product;


public interface DetailProductDAO extends JpaRepository<DetailProduct, DetailProductId>{
	public List<DetailProduct> findByProduct(Product product);
}
