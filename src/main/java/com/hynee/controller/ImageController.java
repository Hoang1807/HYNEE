package com.hynee.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.multipart.MultipartFile;

import com.hynee.entity.Image;
import com.hynee.entity.Product;
import com.hynee.service.CloudinaryService;
import com.hynee.service.ImageService;
import com.hynee.service.ProductService;

import jakarta.servlet.ServletContext;

@RestController
@RequestMapping(value = "admin")
@CrossOrigin(origins = "*")
public class ImageController {
	private final ImageService imageService;
	private final CloudinaryService cloudinaryService;
	private final ProductService productService;
	private final ServletContext servletContext;

	@Autowired
	public ImageController(ImageService imageService, CloudinaryService cloudinaryService,
			ServletContext servletContext,ProductService productService) {
		this.imageService = imageService;
		this.cloudinaryService = cloudinaryService;
		this.servletContext = servletContext;
		this.productService = productService;
	}

	@PostMapping(value = "image/add")
	public ResponseEntity<Void> addImage(@RequestBody Image[] image) {
		for (Image img : image) {
			this.imageService.addImage(img);
		}
		return new ResponseEntity(HttpStatus.OK);
	}

	@PostMapping(value = "image/addClound")
	public ResponseEntity<List<String>> addImageClound(@RequestParam("image") MultipartFile[] files,
			@RequestParam("name") String name) throws Exception {
		if (files.length == 0) {
			return new ResponseEntity("NOT_FILES", HttpStatus.BAD_REQUEST);
		}

		int i = 1;
		List list = new ArrayList<String>();
		File newFile = new File(servletContext.getRealPath("image/"));
		if (!newFile.exists()) {
			newFile.mkdirs();
		}

		for (MultipartFile file : files) {
			String filename = file.getOriginalFilename();
			String filepath = newFile.getAbsolutePath() + File.separator + filename;
			File createImg = new File(filepath);
			file.transferTo(createImg);

			String path_clound = "java6/" + name.replace("#", "") + "/" + "anh" + i;
			list.add(this.cloudinaryService.uploadImage(createImg.getAbsolutePath(), "public_id", name, "public_id",
					path_clound));
			i++;
		}
		newFile.delete();
		return new ResponseEntity(list, HttpStatus.OK);
	}

	
	@GetMapping(value = "image/{id}")
	public ResponseEntity<List<Image>> getImageById(@PathVariable("id") String productId) {
		System.out.println(productId);
		Product product = this.productService.findById(productId);
		List<Image> image = this.imageService.findByProduct(product);
		if (image == null) {
			return new ResponseEntity("NO_EXIST", HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity(image, HttpStatus.OK);
		}
	}
}
