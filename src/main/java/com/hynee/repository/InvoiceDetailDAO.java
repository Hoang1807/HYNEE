package com.hynee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hynee.entity.InvoiceDetail;
import com.hynee.entity.InvoiceDetailId;

public interface InvoiceDetailDAO extends JpaRepository<InvoiceDetail, InvoiceDetailId> {

}
