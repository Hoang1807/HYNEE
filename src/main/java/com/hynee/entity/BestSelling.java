package com.hynee.entity;

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
public class BestSelling {
	@Id
    @Column(name = "ProductId")
    private String productId;
    
    @Column(name = "ProductName")
    private String productName;
    
    @Column(name = "TotalQuantitySold")
    private Long totalRevenue;
}
