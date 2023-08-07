import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../entity/Invoices.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpInvoiceService {
  private baseUrl: string = 'http://localhost:8080/invoices';

  constructor(private http: HttpClient) {}

  getInvoiceById(invoiceId: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}/${invoiceId}`);
  }

  getAllInvoices() {
    return this.http.get<Invoice[]>(this.baseUrl, { observe: 'response' });
  }

  createInvoice(invoice: Invoice) {
    console.log(invoice);
    return this.http.post<Invoice>(this.baseUrl, invoice, {
      observe: 'response',
      params: new HttpParams().append('userPhone', invoice.users.userPhone),
    });
  }

  updateInvoice(
    invoiceId: string,
    updatedInvoice: Invoice
  ): Observable<Invoice> {
    return this.http.put<Invoice>(
      `${this.baseUrl}/${invoiceId}`,
      updatedInvoice
    );
  }

  deleteInvoice(invoiceId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${invoiceId}`);
  }
}
