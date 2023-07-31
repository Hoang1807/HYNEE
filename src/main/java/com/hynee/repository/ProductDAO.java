package com.hynee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.Product;

public interface ProductDAO extends JpaRepository<Product, String>{

}
