package com.hynee.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Revenue {
	@Id
    @Column(name = "IntervalType")
    private Serializable intervalType;
    
    @Column(name = "MonthNumber")
    private Serializable monthNumber;
    
    @Column(name = "YearNumber")
    private Serializable yearNumber;
    
    @Column(name = "TotalRevenue")
    private Long totalRevenue;
}
