package com.hynee.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
import com.hynee.entity.Detail;
import com.hynee.service.DetailService;

@CrossOrigin(origins = "*")
@RequestMapping(value = "admin")
@RestController
public class DetailController {
	private final DetailService detailService;

	@Autowired
	public DetailController(DetailService detailService) {
		this.detailService = detailService;
	}

	@GetMapping(value = "detail/all")
	public ResponseEntity<List<Detail>> getAll() {
		return new ResponseEntity(this.detailService.findAllCategory(), HttpStatus.OK);
	}

	@PostMapping(value = "detail/add")
	public ResponseEntity<Detail> addDetail(@RequestBody Detail detail) {
		UUID uuid = UUID.randomUUID();
		detail.setDetailId(uuid.toString());
		if (this.detailService.findById(detail.getDetailId()) != null) {
			return new ResponseEntity("DETAILID_EXIST", HttpStatus.BAD_REQUEST);
		} else if (this.detailService.findByNameAndValue(detail.getDetailName(), detail.getDetailValue())) {
			return new ResponseEntity("DETAILNAME_EXIST-DETAILVALUE_EXIST", HttpStatus.BAD_REQUEST);
		} else {
			this.detailService.addDetail(detail);
			return new ResponseEntity(detail, HttpStatus.OK);
		}
	}

	@PutMapping("detail/{detailId}")
	public ResponseEntity<Detail> updateDetail(@PathVariable(value = "detailId") Optional<String> detailId,
			@RequestBody Detail detail) {
		if (detailId.isEmpty()) {
			return new ResponseEntity("DETAILID_NOT_EXIST", HttpStatus.NOT_FOUND);
		} else if (this.detailService.findById(detailId.get()) == null) {
			return new ResponseEntity("CATEROGYID_NOT_EXIST", HttpStatus.NOT_FOUND);
		} else {
			this.detailService.updateDetail(detail);
			return new ResponseEntity(detail, HttpStatus.OK);
		}

	}
}
