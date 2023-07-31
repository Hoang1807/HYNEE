package com.hynee.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hynee.entity.Category;
import com.hynee.service.CategoryService;

@RestController
@RequestMapping(value = "admin")
@CrossOrigin(origins = "*")
public class CategoryController {

	private final CategoryService categoryService;

	@Autowired
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	@PostMapping(value = "category/add")
	public ResponseEntity<Category> addCate(@RequestBody Category category) {
		if (this.categoryService.findById(category.getCategoryId()) == null) {
			this.categoryService.addCategory(category);
			return new ResponseEntity(category, HttpStatus.OK);
		}
		return new ResponseEntity("CATEROGYID_EXIST", HttpStatus.BAD_REQUEST);
	}

	@GetMapping(value = "category/all")
	public ResponseEntity<List<Category>> getAll() {
		return new ResponseEntity(this.categoryService.findAllCategory(), HttpStatus.OK);
	}

	@PutMapping("category/{categoryId}")
	public ResponseEntity<Category> updateCate(@PathVariable(value = "categoryId") Optional<String> categoryId,
			@RequestBody Category category) {
		if (categoryId.isEmpty()) {
			return new ResponseEntity("CATEROGYID_NOT_EXIST", HttpStatus.NOT_FOUND);
		} else if (this.categoryService.findById(categoryId.get()) == null) {
			return new ResponseEntity("CATEROGYID_NOT_EXIST", HttpStatus.NOT_FOUND);
		} else {
			this.categoryService.updateCategory(category);
			return new ResponseEntity(category, HttpStatus.OK);
		}

	}
}
