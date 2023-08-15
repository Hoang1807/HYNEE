import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BestSelling } from '../entity/BestSelling.interface';
import { catchError, take, throwError } from 'rxjs';
import { Revenue } from '../entity/Revenue .interface';

@Injectable({
  providedIn: 'root',
})
export class HttpRevenueService {
  private baseUrl = 'http://localhost:8080/admin'; // Update the port number

  constructor(private http: HttpClient) {}
  calculateRevenue(dateFilter: string, intervalType: string) {
    console.log(dateFilter,intervalType);
    const params = new HttpParams()
      .set('dateFilter', dateFilter)
      .set('intervalType', intervalType);

    return this.http
      .get<Revenue>(`${this.baseUrl}/calculate-revenue`, {
        params,
        observe: 'response',
      })
      .pipe(
        take(1),
        catchError((error) => {
          let errorMessage = 'Đã có lỗi xảy ra! Lỗi không được xác định';
          if (!error.error) {
            return throwError(() => errorMessage);
          }
          switch (error.error) {
            case 'NULL':
              errorMessage = 'ERROR';
          }
          return throwError(() => errorMessage);
        })
      );
  }

  getBestSellingProducts(
    startDate: string,
    endDate: string,
    intervalType: string
  ) {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('intervalType', intervalType);

    return this.http.get(`${this.baseUrl}/best-selling-products`, { params });
  }
}
