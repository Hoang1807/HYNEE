package com.hynee.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.ToString;

/**
 * The primary key class for the DETAIL_PRODUCT database table.
 * 
 */
@Embeddable
@ToString
public class DetailProductId  {

	private static final long serialVersionUID = 1L;

	private String productId;
	private String detailId;

	public DetailProductId() {
	}

	@Column(name = "product_id", unique = true, nullable = false, length = 36)
	public String getProductId() {
		return this.productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	@Column(name = "detail_id", unique = true, nullable = false, length = 36)
	public String getDetailId() {
		return this.detailId;
	}

	public void setDetailId(String detailId) {
		this.detailId = detailId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(productId, detailId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null || getClass() != obj.getClass())
			return false;
		DetailProductId other = (DetailProductId) obj;
		return Objects.equals(productId, other.productId) && Objects.equals(detailId, other.detailId);
	}

	// You can add more methods if needed

}
