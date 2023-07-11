import { Product } from './Product.interface';

export interface Discount {
  discountId: string;
  discountPercent: number;
  discountBegin?: Date;
  discountEnd?: Date;
  discountImage?: string;
  products: Product[];
}
