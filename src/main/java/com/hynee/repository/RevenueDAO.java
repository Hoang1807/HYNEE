package com.hynee.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import com.hynee.entity.Product;
import com.hynee.entity.Revenue;

public interface RevenueDAO extends JpaRepository<Revenue, String> {
	@Procedure(procedureName = "CalculateRevenue")
	List<Object[]> calculateRevenue(@Param("DateFilter") Date dateFilter, @Param("IntervalType") String intervalType);

	@Procedure(name = "GetBestSellingProductsByInterval")
	List<Object[]> getBestSellingProductsByInterval(@Param("StartDate") Date startDate,
			@Param("EndDate") Date endDate, @Param("IntervalType") String intervalType);
}
