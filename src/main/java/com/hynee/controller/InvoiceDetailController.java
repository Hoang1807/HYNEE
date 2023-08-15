package com.hynee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hynee.entity.InvoiceDetail;
import com.hynee.entity.InvoiceDetailId;
import com.hynee.service.InvoiceDetailService;

@CrossOrigin(origins = "*")
@RequestMapping("/invoice-details")
@RestController
public class InvoiceDetailController {
	private final InvoiceDetailService invoiceDetailService;

	@Autowired
	public InvoiceDetailController(InvoiceDetailService invoiceDetailService) {
		this.invoiceDetailService = invoiceDetailService;
	}

	@GetMapping
	public List<InvoiceDetail> getAllInvoiceDetails() {
		return invoiceDetailService.getAllInvoiceDetails();
	}
  
	@GetMapping("/{invoiceId}")
    public List<InvoiceDetail> findInvoiceDetailsByInvoiceId(@PathVariable String invoiceId) {
        return invoiceDetailService.findInvoiceDetailsByInvoiceId(invoiceId);
    }
	
	@GetMapping("/{invoiceId}/{productId}/{invoiceDtQuantity}")
	public InvoiceDetail getInvoiceDetailById(@PathVariable String invoiceId, @PathVariable String productId,
			@PathVariable int invoiceDtQuantity) {
		InvoiceDetailId id = new InvoiceDetailId(invoiceId, productId, invoiceDtQuantity);
		return invoiceDetailService.getInvoiceDetailById(id);
	}

	@PostMapping
	public InvoiceDetail createInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail,
			@RequestParam(value = "invoiceId") String invoiceId, @RequestParam(value = "productId") String productId) {
		return invoiceDetailService.createInvoiceDetail(invoiceDetail);
	}

	@DeleteMapping("/{invoiceId}/{productId}/{invoiceDtQuantity}")
	public void deleteInvoiceDetail(@PathVariable String invoiceId, @PathVariable String productId,
			@PathVariable int invoiceDtQuantity) {
		InvoiceDetailId id = new InvoiceDetailId(invoiceId, productId, invoiceDtQuantity);
		invoiceDetailService.deleteInvoiceDetail(id);
	}

	@PutMapping
	public InvoiceDetail updateInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail) {
		return invoiceDetailService.updateInvoiceDetail(invoiceDetail);
	}
}
