import { Category } from './Category.interface';
import { Detail } from './Detail.interface';
import { Discount } from './Discount.interface';
import { Feedback } from './Feedback.interface';
import { Image } from './Image.interface';
import { InvoiceDetail } from './InvoiceDetail.interface';

export interface Product {
  productId: string;
  category: Category;
  discount: Discount;
  productCode: string;
  productName: string;
  productDescription: string;
  productQuantity: number;
  productSize: string;
  productColor: string;
  productPrice: number;
  productStatus: boolean;
  feedbacks: Feedback[];
  details: Detail[];
  images: Image[];
  invoiceDetails: InvoiceDetail[];
}
