package com.hynee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hynee.entity.Detail;
import com.hynee.entity.DetailProduct;
import com.hynee.entity.DetailProductId;
import com.hynee.repository.CategoryDAO;
import com.hynee.repository.DetailProductDAO;

@Service
public class DetailProductService {
	private final DetailProductDAO detailProductDAO;

	@Autowired
	public DetailProductService(DetailProductDAO detailProductDAO) {
		this.detailProductDAO = detailProductDAO;
	}

	public DetailProduct addDetailProduct(DetailProduct detailProduct) {
		return this.detailProductDAO.save(detailProduct);
	}

	public DetailProduct updateDetailProduct(DetailProduct detailProduct) {
		return this.detailProductDAO.save(detailProduct);
	}

	public List<DetailProduct> findAllDetailProduct() {
		return this.detailProductDAO.findAll();
	}

	public DetailProduct findById(DetailProductId productId) {
		return this.detailProductDAO.findById(productId).orElse(null);
	}

	public void deleteDetail(DetailProductId productId) {
		this.detailProductDAO.deleteById(productId);
	}
}
