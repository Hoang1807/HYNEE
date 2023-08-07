package com.hynee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.Image;
import com.hynee.entity.Product;

public interface ImageDAO extends JpaRepository<Image, String> {
	public List<Image> findByProduct(Product product);
}
