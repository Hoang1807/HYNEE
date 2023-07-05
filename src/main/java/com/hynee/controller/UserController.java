package com.hynee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hynee.entity.Users;
import com.hynee.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping(value = "/add")
	public ResponseEntity<Users> getAddUser(){
		return new ResponseEntity<>(new Users("0931","hoàng","123",true),HttpStatus.OK);
	}
	
}
