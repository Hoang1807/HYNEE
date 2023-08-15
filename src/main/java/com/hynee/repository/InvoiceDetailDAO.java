package com.hynee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.InvoiceDetail;
import com.hynee.entity.InvoiceDetailId;

public interface InvoiceDetailDAO extends JpaRepository<InvoiceDetail, InvoiceDetailId> {
	public List<InvoiceDetail> findById_InvoiceId(String invoiceId);
}
