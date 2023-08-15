package com.hynee.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.hynee.entity.Invoice;
import com.hynee.entity.Users;
import com.hynee.service.InvoiceService;
import com.hynee.service.UserService;

@CrossOrigin(origins = "*")
@RequestMapping("/invoices")
@RestController
public class InvoiceController {
	private final InvoiceService invoiceService;
	private final UserService userService;

	@Autowired
	public InvoiceController(InvoiceService invoiceService, UserService userService) {
		this.invoiceService = invoiceService;
		this.userService = userService;
	}

	// Get an invoice by ID
	@GetMapping("/{invoiceId}")
	public ResponseEntity<Invoice> getInvoiceById(@PathVariable String invoiceId) {
		Invoice invoice = invoiceService.getInvoiceById(invoiceId);
		if (invoice != null) {
			return new ResponseEntity(invoice, HttpStatus.OK);
		} else {
			return new ResponseEntity("INVOICEID_NOTEXIST", HttpStatus.NOT_FOUND);
		}
	}

	// Get all invoices
	@GetMapping
	public ResponseEntity<List<Invoice>> getAllInvoices() {
		List<Invoice> invoices = invoiceService.getAllInvoices();
		return new ResponseEntity<>(invoices, HttpStatus.OK);
	}

	@GetMapping("/by-user-phone/{userPhone}")
	public ResponseEntity<List<Invoice>> findInvoicesByUserPhone(@PathVariable String userPhone) {
		List<Invoice> invoices = invoiceService.findInvoicesByUserPhone(userPhone);
		return new ResponseEntity<>(invoices, HttpStatus.OK);
	}

	// Create a new invoice
	@PostMapping
	public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice, @RequestParam String userPhone) {
		UUID uuid = UUID.randomUUID();
		invoice.setInvoiceId(uuid.toString());

		Users user = userService.findById(userPhone);
		invoice.setUsers(user);

		String invoiceId = invoice.getInvoiceId();
		Invoice existingInvoice = invoiceService.getInvoiceById(invoiceId);
		if (existingInvoice != null) {
			// Invoice with the provided ID already exists
			return new ResponseEntity("Invoice with ID " + invoiceId + " already exists.", HttpStatus.CONFLICT);
		}
		Invoice savedInvoice = invoiceService.saveInvoice(invoice);
		return new ResponseEntity(savedInvoice, HttpStatus.CREATED);
	}

	// Update an existing invoice
	@PutMapping("/{invoiceId}")
	public ResponseEntity<Invoice> updateInvoice(@PathVariable String invoiceId, @RequestBody Invoice updatedInvoice,
			@RequestParam(value = "userPhone") String userPhone) {
		Users user = userService.findById(userPhone);
		updatedInvoice.setUsers(user);

		Invoice existingInvoice = invoiceService.getInvoiceById(invoiceId);
		if (existingInvoice != null) {
			updatedInvoice.setInvoiceId(invoiceId);
			Invoice savedInvoice = invoiceService.saveInvoice(updatedInvoice);
			return new ResponseEntity<>(savedInvoice, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Delete an invoice by ID
	@DeleteMapping("/{invoiceId}")
	public ResponseEntity<Void> deleteInvoice(@PathVariable String invoiceId) {
		Invoice existingInvoice = invoiceService.getInvoiceById(invoiceId);
		if (existingInvoice != null) {
			invoiceService.deleteInvoice(invoiceId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
