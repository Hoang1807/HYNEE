package com.hynee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hynee.entity.Users;
import com.hynee.exception.UserNotFoundException;
import com.hynee.repository.UserDAO;

@Service
public class UserService {
	private final UserDAO userDAO;

	@Autowired
	public UserService(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	public Users addUser(Users users) {
		Users user = findById(users.getUserPhone());
		if (user == null) {
			return userDAO.save(users);
		}
		return null;

	}

	public Users updateUsers(Users users) {
		return userDAO.save(users);
	}

	public List<Users> findAllUsers() {
		return userDAO.findAll();
	}

	public Users findById(String id) {
		return userDAO.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
	}

	public void deleteUser(String id) {
		userDAO.deleteById(id);
	}
}
