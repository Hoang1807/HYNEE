package com.hynee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.DetailProduct;
import com.hynee.entity.DetailProductId;

public interface DetailProductDAO extends JpaRepository<DetailProduct, DetailProductId>{
	
}
