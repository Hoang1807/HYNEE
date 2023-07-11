package com.hynee.entity;
// Generated Jul 5, 2023, 11:01:33 AM by Hibernate Tools 4.3.6.Final

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Nationalized;

/**
 * Invoice generated by hbm2java
 */
@Entity
@Table(name = "INVOICE", schema = "dbo", catalog = "HYNEE")
public class Invoice {

	private String invoiceId;
	private Users users;
	private String invoiceNote;
	private String invoiceAddress;
	private Date invoiceDate;
	private Boolean invoiceStatus;
	private Boolean invoice_shipping_status;
	private Set<InvoiceDetail> invoiceDetails = new HashSet<InvoiceDetail>(0);

	public Invoice() {
	}

	public Invoice(Users users, String invoiceAddress) {
		this.users = users;
		this.invoiceAddress = invoiceAddress;
	}

	public Invoice(Users users, String invoiceNote, String invoiceAddress, Date invoiceDate,
			Boolean invoiceStatus, Boolean invoiceShippingStatus, Set<InvoiceDetail> invoiceDetails) {
		this.users = users;
		this.invoiceNote = invoiceNote;
		this.invoiceAddress = invoiceAddress;
		this.invoiceDate = invoiceDate;
		this.invoiceStatus = invoiceStatus;
		this.invoice_shipping_status = invoiceShippingStatus;
		this.invoiceDetails = invoiceDetails;
	}

	@GenericGenerator(name = "generator", strategy = "guid")
	@Id
	@GeneratedValue(generator = "generator")

	@Column(name = "invoice_id", unique = true, nullable = false, length = 36)
	public String getInvoiceId() {
		return this.invoiceId;
	}

	public void setInvoiceId(String invoiceId) {
		this.invoiceId = invoiceId;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_phone", nullable = false)
	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	@Column(name = "invoice_note")
	@Nationalized
	public String getInvoiceNote() {
		return this.invoiceNote;
	}

	public void setInvoiceNote(String invoiceNote) {
		this.invoiceNote = invoiceNote;
	}

	@Column(name = "invoice_address", nullable = false)
	@Nationalized
	public String getInvoiceAddress() {
		return this.invoiceAddress;
	}

	public void setInvoiceAddress(String invoiceAddress) {
		this.invoiceAddress = invoiceAddress;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "invoice_date", length = 23)
	public Date getInvoiceDate() {
		return this.invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	@Column(name = "invoice_status")
	public Boolean getInvoiceStatus() {
		return this.invoiceStatus;
	}

	public void setInvoiceStatus(Boolean invoiceStatus) {
		this.invoiceStatus = invoiceStatus;
	}

	@Column(name = "invoice_shipping_status")
	public Boolean getInvoiceShippingStatus() {
		return this.invoice_shipping_status;
	}

	public void setInvoiceShippingStatus(Boolean invoiceShippingStatus) {
		this.invoice_shipping_status = invoiceShippingStatus;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "invoice")
	public Set<InvoiceDetail> getInvoiceDetails() {
		return this.invoiceDetails;
	}

	public void setInvoiceDetails(Set<InvoiceDetail> invoiceDetails) {
		this.invoiceDetails = invoiceDetails;
	}

}
