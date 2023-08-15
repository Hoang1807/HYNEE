import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InvoiceDetail } from '../entity/InvoiceDetail.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpInvoiceDetailService {
  isLoading = new Subject<boolean>();
  private baseUrl = 'http://localhost:8080/invoice-details'; // Replace with your backend API base URL

  constructor(private http: HttpClient) {}

  getAllInvoiceDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoice-details`);
  }
  getInvoiceDetailById(invoiceId: string) {
    return this.http.get<InvoiceDetail[]>(`${this.baseUrl}/${invoiceId}`, {
      observe: 'response',
    });
  }
  getInvoiceDetail(
    invoiceId: string,
    productId: string,
    invoiceDtQuantity: number
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/invoice-details/${invoiceId}/${productId}/${invoiceDtQuantity}`
    );
  }

  createInvoiceDetail(invoiceDetail: InvoiceDetail) {
    return this.http.post(`${this.baseUrl}`, invoiceDetail, {
      params: new HttpParams()
        .append('invoiceId', invoiceDetail.invoice.invoiceId)
        .append('productId', invoiceDetail.product.productId),
    });
  }

  updateInvoiceDetail(invoiceDetail: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/invoice-details`, invoiceDetail);
  }

  deleteInvoiceDetail(
    invoiceId: string,
    productId: string,
    invoiceDtQuantity: number
  ): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/invoice-details/${invoiceId}/${productId}/${invoiceDtQuantity}`
    );
  }
}
