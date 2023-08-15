package com.hynee.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hynee.entity.Product;
import com.hynee.entity.Revenue;
import com.hynee.repository.RevenueDAO;
@Service
public class RevenueService {
	private final RevenueDAO revenueDAO;

	@Autowired
	public RevenueService(RevenueDAO revenueDAO) {
		this.revenueDAO = revenueDAO;
	}
	public List<Object[]> calculateRevenue(Date dateFilter, String intervalType) {
        return revenueDAO.calculateRevenue(dateFilter, intervalType);
    }
    
    public List<Object[]> getBestSellingProductsByInterval(Date startDate, Date endDate, String intervalType) {
        return revenueDAO.getBestSellingProductsByInterval(startDate, endDate, intervalType);
    }
}
