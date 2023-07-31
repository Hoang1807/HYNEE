package com.hynee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.Detail;

public interface DetailDAO extends JpaRepository<Detail, String> {
	public boolean existsByDetailNameContainingAndDetailValueContaining(String detailName,String detailValue);
}
