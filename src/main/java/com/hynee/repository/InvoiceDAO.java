package com.hynee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.Invoice;

public interface InvoiceDAO extends JpaRepository<Invoice, String>{
	public List<Invoice> findByUsersUserPhone(String userPhone);
}
