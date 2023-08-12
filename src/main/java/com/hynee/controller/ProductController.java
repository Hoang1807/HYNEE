package com.hynee.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

	@Autowired
	public ProductController(ProductService productService, ImageService imageService) {
		this.productService = productService;
	}

	@GetMapping(value = "product/all")
	public ResponseEntity<List<Product>> getAll() {
		return new ResponseEntity(this.productService.findAllProduct(), HttpStatus.OK);
	}

	@GetMapping(value = "product/{id}")
	public ResponseEntity<List<Product>> getById(@PathVariable(value = "id") String productId) {
		Product product = this.productService.findById(productId);
		if (product == null) {
			return new ResponseEntity("PRODUCT_NOTEXITS", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(product, HttpStatus.OK);
	}

//	@GetMapping(value = "product/search")
//	public ResponseEntity<Page<Product>> searchPage(@RequestParam("page") Optional<Integer> page,
//			@RequestParam("sort") Optional<Boolean> sort, @RequestParam("priceTo") Optional<Integer> priceTo,
//			@RequestParam("priceFrom") Optional<Integer> priceFrom) {
//		
//		Pageable pageable = PageRequest.of(page.orElse(0), 9, sort.orElse(true) ? Direction.ASC : Direction.DESC,
//				"productPrice");
//		Page<Product> productPage = this.productService.findPage(pageable);
//		return new ResponseEntity(productPage, HttpStatus.OK);
//	}

	@GetMapping(value = "product/search")
	public ResponseEntity<Page<Product>> searchProducts(@RequestParam("page") Optional<Integer> page,
			@RequestParam("sort") Optional<Boolean> sort,
			@RequestParam(name = "priceTo", required = false) Integer priceTo,
			@RequestParam(name = "priceFrom", required = false) Integer priceFrom,
			@RequestParam(name = "productSize", required = false) String productSize,
			@RequestParam(name = "priceGreaterThan", required = false) Integer priceGreaterThan,
			@RequestParam(name = "productName", required = false) String productName) {
		Pageable pageable = PageRequest.of(page.orElse(0), 9, sort.orElse(true) ? Direction.ASC : Direction.DESC,
				"productPrice");

		Page<Product> productPage;

		if (productSize != null && !productSize.isEmpty()) {
			if ((priceFrom != 0 || priceTo != 0) && priceGreaterThan == 0) {
				productPage = productService.findByProductSizeAndProductPriceBetween(productSize, priceFrom, priceTo,
						pageable);
			} else if (priceGreaterThan != 0) {
				productPage = productService.findByProductSizeAndProductPriceGreaterThan(productSize, priceGreaterThan,
						pageable);
			} else {
				productPage = productService.findByProductSize(productSize, pageable);
			}
		} else if ((priceFrom != 0 || priceTo != 0) && priceGreaterThan == 0) {
			productPage = productService.findByProductPriceBetween(priceFrom, priceTo, pageable);
		} else if (priceGreaterThan != 0) {
			productPage = productService.findByProductPriceGreaterThan(priceGreaterThan, pageable);
		} else if (productName != null && !productName.isEmpty()) {
			productPage = productService.findByProductNameContaining(productName, pageable);
		} else {
			productPage = productService.findPage(pageable);
		}

		return new ResponseEntity<>(productPage, HttpStatus.OK);
	}

	@PostMapping(value = "product/add")
	public ResponseEntity<Product> addProduct(@RequestBody Product product) {
		UUID uuid = UUID.randomUUID();
		product.setProductId(uuid.toString());
		if (this.productService.findById(product.getProductId()) != null) {
			return new ResponseEntity("PRODUCTID_EXIST", HttpStatus.BAD_REQUEST);
		} else if (this.productService.findByCodeAndColor(product.getProductCode(), product.getProductColor())) {
			return new ResponseEntity("PRODUCTCODE_EXIST-PRODUCTCOLOR_EXIST", HttpStatus.BAD_REQUEST);
		} else {
			this.productService.addProduct(product);
			return new ResponseEntity(product, HttpStatus.OK);
		}
	}

	@PutMapping(value = "product/update")
	public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
		Product existingProduct = this.productService.findById(product.getProductId());
		if (existingProduct == null) {
			return new ResponseEntity("PRODUCT_NOT_EXIST", HttpStatus.BAD_REQUEST);
		}
		existingProduct.setProductName(product.getProductName());
		existingProduct.setProductCode(product.getProductCode());
		existingProduct.setProductColor(product.getProductColor());
		existingProduct.setProductQuantity(product.getProductQuantity());
		existingProduct.setProductSize(product.getProductSize());
		existingProduct.setProductColor(product.getProductColor());
		existingProduct.setProductDescription(product.getProductDescription());
		existingProduct.setProductStatus(product.getProductStatus());

		Product updatedProduct = this.productService.updateProduct(existingProduct);
		return new ResponseEntity(updatedProduct, HttpStatus.OK);
	}

}
