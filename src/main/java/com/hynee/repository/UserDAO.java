package com.hynee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.Users;
import com.hynee.service.UserService;

public interface UserDAO extends JpaRepository<Users, String>{

}
