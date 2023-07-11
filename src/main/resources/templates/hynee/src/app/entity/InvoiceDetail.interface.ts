import { InvoiceDetailId } from './InvoiceDetailId.interface';
import { Invoice } from './Invoices.interface';
import { Product } from './Product.interface';

export interface InvoiceDetail {
  id: InvoiceDetailId;
  invoice: Invoice;
  product: Product;
}
