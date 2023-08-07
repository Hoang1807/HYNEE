package com.hynee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hynee.entity.Category;
import com.hynee.entity.Image;
import com.hynee.entity.Product;
import com.hynee.repository.CategoryDAO;
import com.hynee.repository.ImageDAO;

@Service
public class ImageService {
	private final ImageDAO imageDAO;

	@Autowired
	public ImageService(ImageDAO imageDAO) {
		this.imageDAO = imageDAO;
	}

	public Image addImage(Image image) {
		return this.imageDAO.save(image);
	}

	public Image updateImage(Image image) {
		return this.imageDAO.save(image);
	}

	public List<Image> findAllImage() {
		return this.imageDAO.findAll();
	}

	public Image findById(String id) {
//		return userDAO.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
		return this.imageDAO.findById(id).orElse(null);
	}

	public void deleteImage(String id) {
		this.imageDAO.deleteById(id);
	}
	
	public List<Image> findByProduct(Product product){
		return this.imageDAO.findByProduct(product);
	}
}
