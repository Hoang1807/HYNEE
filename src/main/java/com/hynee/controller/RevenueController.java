package com.hynee.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hynee.entity.Product;
import com.hynee.entity.Revenue;
import com.hynee.service.RevenueService;

@CrossOrigin(origins = "*")
@RequestMapping("/admin")
@RestController
public class RevenueController {
	private final RevenueService revenueService;

	@Autowired
	public RevenueController(RevenueService revenueService) {
		this.revenueService = revenueService;
	}

	@GetMapping("/calculate-revenue")
	@Transactional(readOnly = true)
	public List<Revenue> calculateRevenue(@RequestParam("dateFilter") String dateFilter,
	        @RequestParam("intervalType") String intervalType) {
	    return revenueService.calculateRevenue(Date.valueOf(dateFilter), intervalType);
	}

	@GetMapping("/best-selling-products")
	public List<Product> getBestSellingProducts(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate, @RequestParam("intervalType") String intervalType) {
		return revenueService.getBestSellingProductsByInterval(startDate, endDate, intervalType);
	}
}
