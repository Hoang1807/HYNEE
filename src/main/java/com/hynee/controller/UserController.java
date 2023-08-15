package com.hynee.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.hynee.entity.Users;
import com.hynee.service.SecurityService;
import com.hynee.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
	private final UserService userService;
	private final SecurityService securityService;

	@Autowired
	public UserController(UserService userService, SecurityService securityService) {
		this.userService = userService;
		this.securityService = securityService;
	}

	@GetMapping(value = "/all")
	public ResponseEntity<List<Users>> getAllUser() {
		return new ResponseEntity(userService.findAllUsers(), HttpStatus.OK);
	}

	@GetMapping("/{invoiceId}")
	public ResponseEntity<Users> findUsersByInvoiceId(@PathVariable String invoiceId) {
		Users user = userService.findUsersByInvoiceId(invoiceId);
		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping(value = "/login")
	public ResponseEntity<Users> getLoginUser(@RequestBody Users users) {
		Users dataUsers = userService.findById(users.getUserPhone());
		if (dataUsers != null) {
			if (securityService.matches(users.getUserPassword(), dataUsers.getUserPassword())
					|| users.getUserPassword().equals(dataUsers.getUserPassword())) {
				dataUsers.setFeedbacks(null);
				dataUsers.setInvoices(null);
				return new ResponseEntity(dataUsers, HttpStatus.OK);
			} else {
				return new ResponseEntity("USER_NOT_EXISTS", HttpStatus.UNAUTHORIZED);
			}
		} else {
			return new ResponseEntity("USER_NOT_EXISTS", HttpStatus.UNAUTHORIZED);
		}
	}

//	@GetMapping(value = "/find/{phone}")
//	public ResponseEntity<Users> addUser(@RequestBody Users users) {}
	@PostMapping(value = "/add")
	public ResponseEntity<Users> addUser(@RequestBody Users users) {
		String passHash = securityService.encodePassword(users.getUserPassword());
		if (userService.findById(users.getUserPhone()) == null) {
			users.setUserPassword(passHash);
			userService.addUser(users);
			return new ResponseEntity(users, HttpStatus.OK);
		} else {
			return new ResponseEntity("USER_EXISTS", HttpStatus.UNAUTHORIZED);
		}
	}
}
