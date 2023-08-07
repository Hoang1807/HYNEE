package com.hynee.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hynee.entity.Detail;
import com.hynee.entity.DetailProduct;
import com.hynee.service.DetailProductService;
import com.hynee.service.DetailService;

@RestController
@RequestMapping(value = "admin")
@CrossOrigin(origins = "*")
public class DetailProductController {
	private final DetailProductService detailProductService;

	@Autowired
	public DetailProductController(DetailProductService detailProductService) {
		this.detailProductService = detailProductService;
	}

	@PostMapping(value = "detailProduct/add")
	public ResponseEntity<Void> addDetailProduct(@RequestBody DetailProduct[] detailProducts) {
		for (DetailProduct detailProduct : detailProducts) {
			this.detailProductService.addDetailProduct(detailProduct);
		}
		return new ResponseEntity(HttpStatus.OK);

	}
}
