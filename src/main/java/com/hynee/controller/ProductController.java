package com.hynee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hynee.entity.Category;
import com.hynee.entity.Product;
import com.hynee.service.CategoryService;
import com.hynee.service.ImageService;
import com.hynee.service.ProductService;

@RestController
@RequestMapping(value = "admin")
@CrossOrigin(origins = "*")
public class ProductController {
	private final ProductService productService;
	private final ImageService imageService;

	@Autowired
	public ProductController(ProductService productService, ImageService imageService) {
		this.productService = productService;
		this.imageService = imageService;
	}

	@PostMapping(value = "product/add")
	public ResponseEntity<Product> addCate(@RequestBody Product product,
			@RequestParam("image") MultipartFile file) {
		System.out.println(product);
		System.out.println(file.getOriginalFilename());
		return new ResponseEntity("CATEROGYID_EXIST", HttpStatus.BAD_REQUEST);
	}

}
