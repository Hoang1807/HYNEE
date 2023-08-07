package com.hynee.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class CloudinaryService {
	private Cloudinary cloudinary;

	public CloudinaryService(String cloudName, String apiKey, String apiSecret) {
		cloudinary = new Cloudinary(
				ObjectUtils.asMap("cloud_name", cloudName, "api_key", apiKey, "api_secret", apiSecret));
	}

	public CloudinaryService(String Cloudinary_url) {
		cloudinary = new Cloudinary(Cloudinary_url);
	}

	public CloudinaryService() {
		cloudinary = new Cloudinary("cloudinary://125839724628658:hO35eKFFKoNtKEA0NcEK9DonpK4@deupkdvle");
	}

	public String uploadImage(String imagePath) throws Exception {
		try {
			Map uploadResult = cloudinary.uploader().upload(imagePath, ObjectUtils.emptyMap());
			return (String) uploadResult.get("url");
		} catch (Exception e) {
			throw new Exception("Lỗi khi tải lên hình ảnh: " + e.getMessage());
		}
	}

	public String uploadImage(String imagePath, Object... option) throws Exception {
		try {
			Map uploadResult = cloudinary.uploader().upload(imagePath, ObjectUtils.asMap(option));
			return (String) uploadResult.get("url");
		} catch (Exception e) {
			throw new Exception("Lỗi khi tải lên hình ảnh: " + e.getMessage());
		}
	}

	public void deleteImage(String... publicId) throws Exception {
		try {
			// Xóa hình ảnh khỏi Cloudinary dựa trên 'public_id'
			for (String x : publicId) {
				cloudinary.uploader().destroy(x, ObjectUtils.emptyMap());
			}
		} catch (Exception e) {
			throw new Exception("Lỗi khi xóa hình ảnh: " + e.getMessage());
		}
	}

	public void setCloudinary(String cloudName, String apiKey, String apiSecret) {
		cloudinary = new Cloudinary(
				ObjectUtils.asMap("cloud_name", cloudName, "api_key", apiKey, "api_secret", apiSecret));
	}

	public void setCloudinary(String Cloudinary_url) {
		cloudinary = new Cloudinary(Cloudinary_url);
	}
}
