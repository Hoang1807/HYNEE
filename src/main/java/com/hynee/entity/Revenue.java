package com.hynee.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Revenue {
	@Id
    @Column(name = "IntervalType")
    private String intervalType;
    
    @Column(name = "MonthNumber")
    private String monthNumber;
    
    @Column(name = "YearNumber")
    private String yearNumber;
    
    @Column(name = "TotalRevenue")
    private Long totalRevenue;
}
