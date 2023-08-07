package com.hynee.entity;
// Generated Jul 5, 2023, 11:01:33 AM by Hibernate Tools 4.3.6.Final

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.ToString;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Nationalized;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Detail generated by hbm2java
 */
@Entity
@Table(name = "DETAIL", schema = "dbo", catalog = "HYNEE")
@ToString
public class Detail {

	private String detailId;
	private String detailName;
	private String detailValue;
	private List<Product> products;

	public Detail() {
	}

	public Detail(String detailName, String detailValue) {
		this.detailName = detailName;
		this.detailValue = detailValue;
	}

	public Detail(String detailName, String detailValue, List<Product> products) {
		this.detailName = detailName;
		this.detailValue = detailValue;
		this.products = products;
	}

	@Id
	@Column(name = "detail_id", unique = true, nullable = false, length = 36)
	public String getDetailId() {
		return this.detailId;
	}

	public void setDetailId(String detailId) {
		this.detailId = detailId;
	}

	@Column(name = "detail_name", nullable = false)
	@Nationalized
	public String getDetailName() {
		return this.detailName;
	}

	public void setDetailName(String detailName) {
		this.detailName = detailName;
	}

	@Column(name = "detail_value", nullable = false)
	@Nationalized
	public String getDetailValue() {
		return this.detailValue;
	}

	public void setDetailValue(String detailValue) {
		this.detailValue = detailValue;
	}

	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "details")
	public List<Product> getProducts() {
		return this.products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

}
