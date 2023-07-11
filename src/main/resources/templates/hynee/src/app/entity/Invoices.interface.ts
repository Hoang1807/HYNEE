import { InvoiceDetail } from './InvoiceDetail.interface';
import { User } from './User.interface';

export interface Invoice {
  invoiceId: string;
  users: User;
  invoiceNote: string;
  invoiceAddress: string;
  invoiceDate: Date;
  invoiceStatus: boolean;
  invoiceShippingStatus: boolean;
  invoiceDetails: InvoiceDetail[];
}
