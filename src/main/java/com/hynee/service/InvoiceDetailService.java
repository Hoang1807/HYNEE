package com.hynee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hynee.entity.InvoiceDetail;
import com.hynee.entity.InvoiceDetailId;
import com.hynee.repository.InvoiceDetailDAO;

@Service
public class InvoiceDetailService {
	private final InvoiceDetailDAO invoiceDetailDAO;

	@Autowired
	public InvoiceDetailService(InvoiceDetailDAO invoiceDetailDAO) {
		this.invoiceDetailDAO = invoiceDetailDAO;
	}

	public List<InvoiceDetail> getAllInvoiceDetails() {
		return invoiceDetailDAO.findAll();
	}

	public InvoiceDetail getInvoiceDetailById(InvoiceDetailId id) {
		return invoiceDetailDAO.findById(id).orElse(null);
	}

	public InvoiceDetail createInvoiceDetail(InvoiceDetail invoiceDetail) {
		return invoiceDetailDAO.save(invoiceDetail);
	}

	public void deleteInvoiceDetail(InvoiceDetailId id) {
		invoiceDetailDAO.deleteById(id);
	}

	public InvoiceDetail updateInvoiceDetail(InvoiceDetail invoiceDetail) {
		return invoiceDetailDAO.save(invoiceDetail);
	}
}
