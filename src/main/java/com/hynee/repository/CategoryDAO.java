package com.hynee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.Category;
import com.hynee.entity.Users;

public interface CategoryDAO extends JpaRepository<Category, String> {

}
