package com.hynee.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hynee.entity.BestSelling;
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
	public ResponseEntity<Revenue> calculateRevenue(@RequestParam("dateFilter") String dateFilter,
			@RequestParam("intervalType") String intervalType) {
		System.out.println();
		Revenue revenue = null;
		if (intervalType.equals("month_year")) {
			for (Object[] item : revenueService.calculateRevenue(Date.valueOf(dateFilter), intervalType)) {
				revenue = new Revenue(String.valueOf(item[0]), String.valueOf(item[1]), String.valueOf(item[2]),
						Long.valueOf(String.valueOf(item[3])));
			} 
		}else if(intervalType.equals("day")) {
			for (Object[] item : revenueService.calculateRevenue(Date.valueOf(dateFilter), intervalType)) {
				revenue = new Revenue(String.valueOf(item[0]), String.valueOf(item[1]), null,Long.valueOf(String.valueOf(item[2])));
			}
		}
		if(revenue == null) {
			return new ResponseEntity("NULL",HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity(revenue,HttpStatus.OK);
		}
	}

	@GetMapping("/best-selling-products")
	@Transactional(readOnly = true)
	public List<BestSelling> getBestSellingProducts(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate, @RequestParam("intervalType") String intervalType) {
		List<BestSelling> bestSellings = new ArrayList<>();
		for (Object[] item : revenueService.getBestSellingProductsByInterval(Date.valueOf(startDate),
				Date.valueOf(endDate), intervalType)) {
			BestSelling bestSelling = new BestSelling(String.valueOf(item[0]), String.valueOf(item[1]),
					Long.valueOf(String.valueOf(item[2])));
			bestSellings.add(bestSelling);
		}
		return bestSellings;
	}
}
