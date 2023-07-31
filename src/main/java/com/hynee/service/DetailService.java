package com.hynee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hynee.entity.Category;
import com.hynee.entity.Detail;
import com.hynee.repository.CategoryDAO;
import com.hynee.repository.DetailDAO;

@Service
public class DetailService {

	private final DetailDAO detailDAO;

	@Autowired
	public DetailService(DetailDAO detailDAO) {
		this.detailDAO = detailDAO;
	}
	
	public Detail addDetail(Detail detail) {
		return detailDAO.save(detail);
	}

	public Detail updateDetail(Detail detail) {
		return detailDAO.save(detail);
	}

	public List<Detail> findAllCategory() {
		return this.detailDAO.findAll();
	}

	public Detail findById(String id) {
//		return userDAO.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
		return this.detailDAO.findById(id).orElse(null);
	}

	public void deleteDetail(String id) {
		this.detailDAO.deleteById(id);
	}
	public boolean findByNameAndValue(String detailName,String detailValue) {
		return this.detailDAO.existsByDetailNameContainingAndDetailValueContaining(detailName, detailValue);
	}
}
