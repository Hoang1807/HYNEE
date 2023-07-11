package com.hynee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hynee.entity.Users;
import com.hynee.service.SecurityService;
import com.hynee.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
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
		return new ResponseEntity(userService.findAllUsers(),HttpStatus.OK);
	}
	
//	@GetMapping(value = "/find")
	
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
