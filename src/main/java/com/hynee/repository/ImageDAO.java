package com.hynee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.Image;

public interface ImageDAO extends JpaRepository<Image, String> {

}
