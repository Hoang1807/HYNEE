package com.hynee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.Invoice;

public interface InvoiceDAO extends JpaRepository<Invoice, String>{

}
