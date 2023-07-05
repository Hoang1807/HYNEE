package com.hynee.entity;
// Generated Jul 5, 2023, 11:01:33 AM by Hibernate Tools 4.3.6.Final

import java.util.Date;

import org.hibernate.annotations.Nationalized;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * Feedback generated by hbm2java
 */
@Entity
@Table(name = "FEEDBACK", schema = "dbo", catalog = "HYNEE")
public class Feedback {

	private FeedbackId id;
	private Product product;
	private Users users;
	private String feedbackContent;
	private Date feedbackDate;
	private byte feedbackStar;

	public Feedback() {
	}

	public Feedback(FeedbackId id, Product product, Users users, String feedbackContent, byte feedbackStar) {
		this.id = id;
		this.product = product;
		this.users = users;
		this.feedbackContent = feedbackContent;
		this.feedbackStar = feedbackStar;
	}

	public Feedback(FeedbackId id, Product product, Users users, String feedbackContent, Date feedbackDate,
			byte feedbackStar) {
		this.id = id;
		this.product = product;
		this.users = users;
		this.feedbackContent = feedbackContent;
		this.feedbackDate = feedbackDate;
		this.feedbackStar = feedbackStar;
	}

	@EmbeddedId

	@AttributeOverrides({
			@AttributeOverride(name = "productId", column = @Column(name = "product_id", nullable = false, length = 36)),
			@AttributeOverride(name = "userPhone", column = @Column(name = "user_phone", nullable = false, length = 10)) })
	public FeedbackId getId() {
		return this.id;
	}

	public void setId(FeedbackId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false, insertable = false, updatable = false)
	public Product getProduct() {
		return this.product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_phone", nullable = false, insertable = false, updatable = false)
	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	@Column(name = "feedback_content", nullable = false)
	@Nationalized
	public String getFeedbackContent() {
		return this.feedbackContent;
	}

	public void setFeedbackContent(String feedbackContent) {
		this.feedbackContent = feedbackContent;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "feedback_date", length = 10)
	public Date getFeedbackDate() {
		return this.feedbackDate;
	}

	public void setFeedbackDate(Date feedbackDate) {
		this.feedbackDate = feedbackDate;
	}

	@Column(name = "feedback_star", nullable = false)
	public byte getFeedbackStar() {
		return this.feedbackStar;
	}

	public void setFeedbackStar(byte feedbackStar) {
		this.feedbackStar = feedbackStar;
	}

}
