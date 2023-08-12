package com.hynee.controller;

import java.util.List;
import java.util.UUID;

import org.aspectj.weaver.patterns.ThisOrTargetAnnotationPointcut;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hynee.entity.Detail;
import com.hynee.entity.DetailProduct;
import com.hynee.entity.DetailProductId;
import com.hynee.entity.Product;
import com.hynee.service.DetailProductService;
import com.hynee.service.DetailService;
import com.hynee.service.ProductService;

@RestController
@RequestMapping(value = "admin")
@CrossOrigin(origins = "*")
public class DetailProductController {
	private final DetailProductService detailProductService;
	private final ProductService productService;
	private final DetailService detailService;

	@Autowired
	public DetailProductController(DetailProductService detailProductService, ProductService productService,
			DetailService detailService) {
		this.detailProductService = detailProductService;
		this.productService = productService;
		this.detailService = detailService;
	}

	@GetMapping(value = "detailProduct/{id}")
	public ResponseEntity<List<DetailProduct>> getDetailProduct(@PathVariable(value = "id") String productId) {
		Product product = this.productService.findById(productId);
		if (product == null) {
			return new ResponseEntity("PRODUCT_NOT_EXIST", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity(this.detailProductService.findByDetailProduct(product), HttpStatus.OK);

	}

	@PostMapping(value = "detailProduct/add")
	public ResponseEntity<Void> addDetailProduct(@RequestBody DetailProduct detailProducts,
			@RequestParam(value = "productId") String productId, @RequestParam(value = "detailId") String detailId) {
		Product product = this.productService.findById(productId);
		Detail detail = this.detailService.findById(detailId);
		detailProducts.setProduct(product);
		detailProducts.setDetail(detail);
		this.detailProductService.addDetailProduct(detailProducts);
		return new ResponseEntity(HttpStatus.OK);

	}
}
