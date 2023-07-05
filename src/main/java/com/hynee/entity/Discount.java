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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import org.hibernate.annotations.GenericGenerator;

/**
 * Discount generated by hbm2java
 */
@Entity
@Table(name = "DISCOUNT", schema = "dbo", catalog = "HYNEE")
public class Discount{

	private String discountId;
	private int discountPercent;
	private Date discountBegin;
	private Date discountEnd;
	private String discountImage;
	private Set<Product> products = new HashSet<Product>(0);

	public Discount() {
	}

	public Discount(int discountPercent) {
		this.discountPercent = discountPercent;
	}

	public Discount(int discountPercent, Date discountBegin, Date discountEnd, String discountImage,
			Set<Product> products) {
		this.discountPercent = discountPercent;
		this.discountBegin = discountBegin;
		this.discountEnd = discountEnd;
		this.discountImage = discountImage;
		this.products = products;
	}

	@GenericGenerator(name = "generator", strategy = "guid")
	@Id
	@GeneratedValue(generator = "generator")

	@Column(name = "discount_id", unique = true, nullable = false, length = 36)
	public String getDiscountId() {
		return this.discountId;
	}

	public void setDiscountId(String discountId) {
		this.discountId = discountId;
	}

	@Column(name = "discount_percent", nullable = false)
	public int getDiscountPercent() {
		return this.discountPercent;
	}

	public void setDiscountPercent(int discountPercent) {
		this.discountPercent = discountPercent;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "discount_begin", length = 10)
	public Date getDiscountBegin() {
		return this.discountBegin;
	}

	public void setDiscountBegin(Date discountBegin) {
		this.discountBegin = discountBegin;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "discount_end", length = 10)
	public Date getDiscountEnd() {
		return this.discountEnd;
	}

	public void setDiscountEnd(Date discountEnd) {
		this.discountEnd = discountEnd;
	}

	@Column(name = "discount_image")
	public String getDiscountImage() {
		return this.discountImage;
	}

	public void setDiscountImage(String discountImage) {
		this.discountImage = discountImage;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "discount")
	public Set<Product> getProducts() {
		return this.products;
	}

	public void setProducts(Set<Product> products) {
		this.products = products;
	}

}
