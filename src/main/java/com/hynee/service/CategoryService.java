package com.hynee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hynee.entity.Category;
import com.hynee.repository.CategoryDAO;
@Service
public class CategoryService {
	private final CategoryDAO categoryDAO;

	@Autowired
	public CategoryService(CategoryDAO categoryDAO) {
		this.categoryDAO = categoryDAO;
	}
	
	public Category addCategory(Category category) {
		return categoryDAO.save(category);
	}

	public Category updateCategory(Category category) {
		return categoryDAO.save(category);
	}

	public List<Category> findAllCategory() {
		return categoryDAO.findAll();
	}

	public Category findById(String id) {
//		return userDAO.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
		return categoryDAO.findById(id).orElse(null);
	}

	public void deleteCategory(String id) {
		categoryDAO.deleteById(id);
	}
}
