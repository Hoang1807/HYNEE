package com.hynee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hynee.entity.Invoice;
import com.hynee.repository.InvoiceDAO;


@Service
public class InvoiceService {
	private final InvoiceDAO invoiceDAO;

    @Autowired
    public InvoiceService(InvoiceDAO invoiceDAO) {
        this.invoiceDAO = invoiceDAO;
    }

    public Invoice getInvoiceById(String invoiceId) {
        return invoiceDAO.findById(invoiceId).orElse(null);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceDAO.findAll();
    }

    public Invoice saveInvoice(Invoice invoice) {
        return invoiceDAO.save(invoice);
    }

    public void deleteInvoice(String invoiceId) {
        invoiceDAO.deleteById(invoiceId);
    }
    
    public List<Invoice> findInvoicesByUserPhone(String userPhone) {
        return invoiceDAO.findByUsersUserPhone(userPhone);
    }
}
