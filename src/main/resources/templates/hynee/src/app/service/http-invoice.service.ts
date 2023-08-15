import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Invoice } from '../entity/Invoices.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpInvoiceService {
  isLoading = new Subject<boolean>();
  private baseUrl: string = 'http://localhost:8080/invoices';

  constructor(private http: HttpClient) {}

  getInvoiceById(invoiceId: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}/${invoiceId}`);
  }

  getAllInvoices() {
    return this.http.get<Invoice[]>(this.baseUrl, { observe: 'response' });
  }
  getInvoiceByUserPhone(userPhone: string) {
    return this.http.get<Invoice[]>(
      `${this.baseUrl}/by-user-phone/${userPhone}`,
      {
        observe: 'response',
      }
    );
  }
  createInvoice(invoice: Invoice) {
    return this.http.post<Invoice>(this.baseUrl, invoice, {
      observe: 'response',
      params: new HttpParams().append('userPhone', invoice.users.userPhone),
    });
  }

  updateInvoice(invoiceId: string, updatedInvoice: Invoice) {
    return this.http.put<Invoice>(
      `${this.baseUrl}/${invoiceId}`,
      updatedInvoice,
      {
        observe: 'response',
        params: new HttpParams().append(
          'userPhone',
          updatedInvoice.users.userPhone
        ),
      }
    );
  }

  deleteInvoice(invoiceId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${invoiceId}`);
  }
}
